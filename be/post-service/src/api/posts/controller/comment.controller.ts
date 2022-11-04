import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreateCommentReqDto, UpdateCommentReqDto } from '../dto/req/comment-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { BaseApiResponse, SwaggerBaseApiResponse } from '@common/dto/base-api-response.dto';
import { CommentResDto, IndexCommentResDto } from '../dto/res/comment-res.dto';
import { CommentService } from '../service/comment.service';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@ApiTags('Comments')
@Controller({ path: 'comments', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class CommentController {
  constructor(private commentService: CommentService) {
  }

  @Post()
  @UseGuards(AuthGuard(false))
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse([CommentResDto], HttpStatus.CREATED) })
  async create(@Body() dto: CreateCommentReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.createComment(dto, user);
    return {
      message: null,
      data
    };
  }

  @Get()
  @ApiOkResponse({ type: SwaggerBaseApiResponse(IndexCommentResDto, HttpStatus.OK) })
  async index(@Query('post_id', ParseIntPipe) id: number, @Query('page', ParseIntPipe) page: number): Promise<BaseApiResponse<IndexCommentResDto>> {
    let limit = 20;
    let data = await this.commentService.fetchComments(id, page, limit);
    return {
      message: null,
      data
    };
  }


  @Get(':id')
  @ApiOkResponse({ type: SwaggerBaseApiResponse(CommentResDto, HttpStatus.OK) })
  async show(@Param('id', ParseIntPipe) id: number): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.showComment(id);
    return {
      message: null,
      data
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard(true))
  @ApiSecurity('auth')
  @ApiOkResponse({ type: SwaggerBaseApiResponse(CommentResDto, HttpStatus.OK) })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCommentReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.updateComment(id, body, user);
    return {
      message: null,
      data
    };
  }


  @Delete(':id')
  @UseGuards(AuthGuard(true))
  @ApiSecurity('auth')
  @ApiOkResponse({ type: SwaggerBaseApiResponse(String, HttpStatus.OK) })
  async delete(@Param('id', ParseIntPipe) id: number, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<null>> {
    await this.commentService.deleteComment(id, user);
    return {
      message: null,
      data: null
    };
  }


}