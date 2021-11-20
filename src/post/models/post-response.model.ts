import { ApiProperty } from '@nestjs/swagger';
import { IPost } from '../interfaces/post.interface';
import { IUser } from '../interfaces/user.interface';
import { User } from './user.model';

export class PostResponse implements Omit<IPost, 'userId'> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  user: User;
  constructor(id: number, title: string, body: string, user: IUser) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.user = new User(
      user?.id,
      user?.name,
      user?.username,
      user?.email,
      user?.address,
      user?.phone,
      user?.website,
      user?.company,
    );
  }
}
