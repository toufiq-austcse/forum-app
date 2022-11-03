import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentReqDto, UpdateCommentReqDto } from '../dto/req/comment-req.dto';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { Comment } from '../entity/comment.entity';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../entity/post.entity';
import { plainToInstance } from 'class-transformer';
import { CommentResDto, IndexCommentResDto } from '../dto/res/comment-res.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentService {
  constructor(private repository: CommentRepository, private postRepository: PostRepository) {
  }

  getCommentObj(post: Post, dto: CreateCommentReqDto, user: UserInfo): Comment {
    return this.repository.create({
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
    let newComment = await this.repository.save(commentObj);
    (newComment as any).user = user;
    return plainToInstance(CommentResDto, newComment, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });

  }

  async fetchComments(id: number, page: number, limit: number): Promise<IndexCommentResDto> {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    let res = await paginate<Comment>(this.repository, { page, limit }, { post });
    console.log('res ', res);
    return plainToInstance(IndexCommentResDto, res, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async showComment(id: number): Promise<CommentResDto> {
    let comment = await this.repository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return plainToInstance(CommentResDto, comment, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async updateComment(id: number, body: UpdateCommentReqDto): Promise<CommentResDto> {
    let comment = await this.repository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    let updatedComment = await this.repository.save({ ...comment, ...body });
    return plainToInstance(CommentResDto, updatedComment, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async deleteComment(id: number): Promise<void> {
    let comment = await this.repository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.repository.delete({ id });
  }
}