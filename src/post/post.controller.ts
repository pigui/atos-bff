import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostWithUser } from './models/post-with-user.model';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOkResponse({ type: [PostWithUser], description: 'get post with users' })
  @Get()
  findAll(): Observable<PostWithUser[]> {
    return this.postService.findAll();
  }

  @ApiOkResponse({ type: PostWithUser, description: 'create post' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOkResponse({ type: PostWithUser, description: 'update post' })
  @Put()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }
}
