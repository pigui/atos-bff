import { ApiProperty } from '@nestjs/swagger';
import { IPost } from '../interfaces/post.interface';

export class Post implements IPost {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;

  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
