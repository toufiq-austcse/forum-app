import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePostReqDto, UpdatePostReqDto } from '../dto/req/post-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { PostResDto } from '../dto/res/post-res.dto';
import { BaseApiResponse } from '@common/dto/base-api-response.dto';
import { PostService } from '../service/post.service';

@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private postService: PostService) {
  }

  index() {

  }

  async show(@Param('id') id: number): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.showPost(id);
    return {
      data,
      message: null
    };
  }


  async create(@Body() dto: CreatePostReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.createPost(dto, user);
    return {
      message: null,
      data
    };
  }

  async update(@Param('id') id: number, @Body() dto: UpdatePostReqDto): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.updatePost(id, dto);
    return {
      message: null,
      data

    };
  }

}