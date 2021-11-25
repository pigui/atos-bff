import { ApiProperty } from '@nestjs/swagger';
import { IPost } from '../interfaces/post.interface';
import { IUser } from '../../user/interfaces/user.interface';
import { User } from '../../user/models/user.model';
import { IComment } from '../interfaces/comment.interface';
import { Comment } from './comment.model';

export class PostWithUser implements Omit<IPost, 'userId'> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
  @ApiProperty({ type: User, description: 'own user' })
  user: User;
  @ApiProperty({ type: [Comment] })
  comments: Comment[];
  constructor(
    id: number,
    title: string,
    body: string,
    user: IUser,
    comments: IComment[] = [],
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.user = new User(user?.id, user?.name, user?.username, user?.email);
    this.comments = comments.map(
      (comment: IComment) =>
        new Comment(comment.id, comment.name, comment.body, comment.postId),
    );
  }
}
