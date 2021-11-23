import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, mergeMap, pluck, reduce } from 'rxjs/operators';
import { IUser } from './interfaces/user.interface';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  findAll(): Observable<User[]> {
    return this.httpService
      .get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
      .pipe(
        pluck('data'),
        mergeMap((data) => data),
        map(
          (data) => new User(data?.id, data?.name, data?.username, data?.email),
        ),
        reduce((acc, val) => [...acc, val], []),
      );
  }
}
