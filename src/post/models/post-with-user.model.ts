import { ApiProperty } from '@nestjs/swagger';
import { IPost } from '../interfaces/post.interface';
import { IUser } from '../../user/interfaces/user.interface';
import { User } from '../../user/models/user.model';

export class PostWithUser implements Omit<IPost, 'userId'> {
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
    this.user = new User(user?.id, user?.name, user?.username, user?.email);
  }
}
