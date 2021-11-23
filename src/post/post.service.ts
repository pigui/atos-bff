import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, map, mergeMap, pluck, reduce, tap } from 'rxjs/operators';
import { IPost } from './interfaces/post.interface';
import { IUser } from '../user/interfaces/user.interface';
import { PostWithUser } from './models/post-with-user.model';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {}

  create(createPostDto: CreatePostDto): Observable<PostWithUser> {
    return this.httpService
      .post<IPost>(`https://jsonplaceholder.typicode.com/posts`, createPostDto)
      .pipe(
        pluck('data'),
        concatMap((post) =>
          this.httpService
            .get<IUser[]>(
              `https://jsonplaceholder.typicode.com/users?userId=${post.userId}`,
            )
            .pipe(
              pluck('data'),
              map(
                (user) =>
                  new PostWithUser(post.id, post.title, post.body, user[0]),
              ),
            ),
        ),
      );
  }

  update(updatePostDto: UpdatePostDto) {
    return this.httpService
      .put<IPost>(
        `https://jsonplaceholder.typicode.com/posts/${updatePostDto.id}`,
        updatePostDto,
      )
      .pipe(
        pluck('data'),
        concatMap((post) =>
          this.httpService
            .get<IUser[]>(
              `https://jsonplaceholder.typicode.com/users?userId=${post.userId}`,
            )
            .pipe(
              pluck('data'),
              map(
                (user) =>
                  new PostWithUser(post.id, post.title, post.body, user[0]),
              ),
            ),
        ),
      );
  }

  findAll(): Observable<PostWithUser[]> {
    return forkJoin([
      this.httpService
        .get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`)
        .pipe(pluck('data')),
      this.httpService
        .get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
        .pipe(pluck('data')),
    ]).pipe(
      concatMap(([posts, users]: [IPost[], IUser[]]) => {
        return from(posts).pipe(
          map(
            (post) =>
              new PostWithUser(
                post.id,
                post.title,
                post.body,
                users.find((user) => user.id === post.userId),
              ),
          ),
          reduce((acc, val) => [...acc, val], []),
        );
      }),
    );
  }
}
