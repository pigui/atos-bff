import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { concatMap, map, mergeMap, pluck, reduce, tap } from 'rxjs/operators';
import { IPost } from './interfaces/post.interface';
import { IUser } from './interfaces/user.interface';
import { PostResponse } from './models/post-response.model';

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {}

  findAll(): Observable<PostResponse[]> {
    return this.httpService
      .get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        pluck('data'),
        mergeMap((data) => data),
        concatMap((post) =>
          this.httpService
            .get<IUser[]>(
              `https://jsonplaceholder.typicode.com/users?id=${post.userId}`,
            )
            .pipe(
              pluck('data'),
              map((data) => data[0]),
              map(
                (user) =>
                  new PostResponse(post.id, post.title, post.body, user),
              ),
            ),
        ),
        reduce((acc, val) => [...acc, val], []),
      );
  }
}
