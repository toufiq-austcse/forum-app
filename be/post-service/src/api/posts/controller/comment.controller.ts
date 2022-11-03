import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCommentReqDto, UpdateCommentReqDto } from '../dto/req/comment-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { BaseApiResponse } from '@common/dto/base-api-response.dto';
import { CommentResDto, IndexCommentResDto } from '../dto/res/comment-res.dto';
import { CommentService } from '../service/comment.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';

@ApiTags('Comments')
@Controller({ path: 'comments', version: '1' })
export class CommentController {
  constructor(private commentService: CommentService) {
  }

  @Post()
  @UseGuards(AuthGuard(false))
  async create(@Body() dto: CreateCommentReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.createComment(dto, user);
    return {
      message: null,
      data
    };
  }

  @Get()
  async index(@Query('post_id', ParseIntPipe) id: number, @Query('page', ParseIntPipe) page: number): Promise<BaseApiResponse<IndexCommentResDto>> {
    let limit = 20;
    let data = await this.commentService.fetchComments(id, page, limit);
    return {
      message: null,
      data
    };
  }


  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.showComment(id);
    return {
      message: null,
      data
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCommentReqDto): Promise<BaseApiResponse<CommentResDto>> {
    let data = await this.commentService.updateComment(id, body);
    return {
      message: null,
      data
    };
  }


  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<BaseApiResponse<null>> {
    await this.commentService.deleteComment(id);
    return {
      message: null,
      data: null
    };
  }


}