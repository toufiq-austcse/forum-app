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
import { IndexPostResDto, PostResDto } from '../dto/res/post-res.dto';
import { BaseApiResponse, SwaggerBaseApiResponse } from '@common/dto/base-api-response.dto';
import { PostService } from '../service/post.service';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { CreateCommentReqDto } from '../dto/req/comment-req.dto';
import { CommentResDto } from '../dto/res/comment-res.dto';
import { CommentService } from '../service/comment.service';

@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class PostController {
  constructor(private postService: PostService, private commentService: CommentService) {
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


  @Post(':id/comments')
  @UseGuards(AuthGuard(false))
  @ApiSecurity('auth')
  async createComment(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCommentReqDto,
                      @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.createComment(id, dto, user);
    return {
      message: null,
      data
    };
  }


}