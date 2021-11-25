import { ApiProperty } from '@nestjs/swagger';
import { IComment } from '../interfaces/comment.interface';

export class Comment implements IComment {
  @ApiProperty()
  postId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  body: string;
  constructor(id: number, name: string, body: string, postId: number) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.postId = postId;
  }
}
