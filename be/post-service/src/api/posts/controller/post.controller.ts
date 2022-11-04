import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreatePostReqDto, UpdatePostReqDto } from '../dto/req/post-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { IndexFeedPostResDto, IndexPostResDto, PostResDto } from '../dto/res/post-res.dto';
import { BaseApiResponse, SwaggerBaseApiResponse } from '@common/dto/base-api-response.dto';
import { PostService } from '../service/post.service';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class PostController {
  constructor(private postService: PostService) {
  }

  @Get()
  @UseGuards(AuthGuard(true))
  @ApiOkResponse({ type: SwaggerBaseApiResponse(IndexPostResDto, HttpStatus.OK) })
  @ApiSecurity('auth')
  async index(@Query('page', ParseIntPipe) page: number, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<IndexPostResDto>> {
    let limit = 20;
    let data = await this.postService.indexPost(page, limit, user);
    return {
      message: null,
      data
    };

  }

  @Get('feed')
  @ApiOkResponse({ type: SwaggerBaseApiResponse(IndexFeedPostResDto, HttpStatus.OK) })
  async feed(@Query('page', ParseIntPipe) page: number): Promise<BaseApiResponse<IndexFeedPostResDto>> {
    let limit = 20;
    let data = await this.postService.getFeedPosts(page, limit);
    return {
      message: null,
      data
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard(true))
  @ApiOkResponse({ type: SwaggerBaseApiResponse(PostResDto, HttpStatus.OK) })
  @ApiSecurity('auth')
  async show(@Param('id', ParseIntPipe) id: number): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.showPost(id);
    return {
      data,
      message: null
    };
  }

  @Post()
  @UseGuards(AuthGuard(true))
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(PostResDto, HttpStatus.CREATED) })
  @ApiSecurity('auth')
  async create(@Body() dto: CreatePostReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.createPost(dto, user);
    return {
      message: null,
      data
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard(true))
  @ApiOkResponse({ type: SwaggerBaseApiResponse(PostResDto, HttpStatus.OK) })
  @ApiSecurity('auth')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostReqDto): Promise<BaseApiResponse<PostResDto>> {
    let data = await this.postService.updatePost(id, dto);
    return {
      message: null,
      data
    };
  }
}