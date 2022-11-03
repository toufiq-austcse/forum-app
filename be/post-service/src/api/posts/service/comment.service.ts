import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentReqDto } from '../dto/req/comment-req.dto';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { Comment } from '../entity/comment.entity';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../entity/post.entity';
import { plainToInstance } from 'class-transformer';
import { CommentResDto } from '../dto/res/comment-res.dto';

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

  async createComment(postId: number, dto: CreateCommentReqDto, user: UserInfo): Promise<CommentResDto> {
    let post = await this.postRepository.findOne({ where: { id: postId } });
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
}