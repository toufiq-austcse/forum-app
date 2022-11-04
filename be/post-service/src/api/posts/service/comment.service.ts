import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentReqDto, UpdateCommentReqDto } from '../dto/req/comment-req.dto';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { Comment } from '../entity/comment.entity';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../entity/post.entity';
import { plainToInstance } from 'class-transformer';
import { CommentResDto, IndexCommentResDto } from '../dto/res/comment-res.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { AuthApiService } from '@common/http-clients/auth/auth-api.service';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository,
              private postRepository: PostRepository,
              private authApiService: AuthApiService) {

  }

  getCommentObj(post: Post, dto: CreateCommentReqDto, user: UserInfo): Comment {
    return this.commentRepository.create({
      post,
      user_id: user ? user.id : null,
      body: dto.body
    });
  }

  async createComment(dto: CreateCommentReqDto, user: UserInfo): Promise<CommentResDto> {
    let post = await this.postRepository.findOne({ where: { id: dto.post_id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    let commentObj = this.getCommentObj(post, dto, user);
    let newComment = await this.commentRepository.save(commentObj);
    await this.postRepository.incrementNoOfComments(post.id);
    (newComment as any).user = user;
    return plainToInstance(CommentResDto, newComment, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });

  }

  mapCommentUser(users: Record<string, UserInfo>, comment: Comment): Comment {
    if (!comment.user_id) {
      return comment;
    }
    if (users[comment.user_id]) {
      comment.user = users[comment.user_id];
    }
    return comment;
  }

  async mapCommentsUser(comments: Comment[]): Promise<Comment[]> {
    let userIds = comments.map(item => item.user_id).filter(item => item !== null);
    let users = await this.authApiService.fetchUserList(userIds);
    return comments.map(comment => this.mapCommentUser(users, comment));
  }

  async fetchComments(id: number, page: number, limit: number): Promise<IndexCommentResDto> {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    let { items, meta } = await paginate<Comment>(this.commentRepository, { page, limit }, {
      post,
      select: ['id', 'body', 'user_id', 'createdAt', 'updatedAt']
    });
    let comments = await this.mapCommentsUser(items);
    return plainToInstance(IndexCommentResDto, { comments, meta }, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async showComment(id: number): Promise<CommentResDto> {
    let comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    comment = (await this.mapCommentsUser([comment]))[0];
    return plainToInstance(CommentResDto, comment, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async updateComment(id: number, body: UpdateCommentReqDto, user: UserInfo): Promise<CommentResDto> {
    let comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.user_id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this comment');
    }
    let updatedComment = await this.commentRepository.save({ ...comment, ...body });
    updatedComment = (await this.mapCommentsUser([updatedComment]))[0];
    return plainToInstance(CommentResDto, updatedComment, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async deleteComment(id: number, user: UserInfo): Promise<void> {
    let comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.user_id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this comment');
    }
    await this.commentRepository.delete({ id });
    await this.postRepository.decrementNoOfComments(comment.post_id);
  }
}