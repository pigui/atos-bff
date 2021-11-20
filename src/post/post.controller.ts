import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PostResponse } from './models/post-response.model';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOkResponse({ type: [PostResponse], description: 'get post with users' })
  @Get()
  findAll(): Observable<PostResponse[]> {
    return this.postService.findAll();
  }
}
