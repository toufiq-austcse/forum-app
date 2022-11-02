import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreatePostReqDto, UpdatePostReqDto } from '../dto/req/post-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { PostResDto } from '../dto/res/post-res.dto';
import { BaseApiResponse } from '@common/dto/base-api-response.dto';
import { PostService } from '../service/post.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';

@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private postService: PostService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  async index(@Query('page', ParseIntPipe) page: number, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<any>> {
    let limit = 20;
    let data = await this.postService.indexPost(page, limit, user);
    return {
      message: null,
      data
    };

  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async show(@Param('id', ParseIntPipe) id: number): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.showPost(id);
    return {
      data,
      message: null
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreatePostReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.createPost(dto, user);
    return {
      message: null,
      data
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostReqDto): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.updatePost(id, dto);
    return {
      message: null,
      data
    };
  }

}