import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostReqDto, UpdatePostReqDto } from '../dto/req/post-req.dto';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { Post } from '../entity/post.entity';
import { IndexPostResDto, PostResDto } from '../dto/res/post-res.dto';
import { plainToInstance } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {
  }

  getPostObj(dto: CreatePostReqDto, user: UserInfo): Post {
    return this.postRepository.create({
      title: dto.title,
      is_published: dto.is_published,
      content: dto.content,
      user_id: user.id
    });
  }

  async createPost(dto: CreatePostReqDto, user: UserInfo): Promise<PostResDto> {
    let postObj = this.getPostObj(dto, user);
    let newPost = await this.postRepository.save(postObj);
    return plainToInstance(PostResDto, newPost, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async updatePost(id: number, dto: UpdatePostReqDto): Promise<PostResDto> {
    let oldPost = await this.postRepository.findOne({
      where: {
        id
      }
    });
    if (!oldPost) {
      throw new NotFoundException('Post not found');
    }
    let updatedPost = await this.postRepository.save({
      ...oldPost,
      ...dto
    });
    return plainToInstance(PostResDto, updatedPost, {
      excludeExtraneousValues: true, enableImplicitConversion: true
    });
  }

  async showPost(id: number): Promise<PostResDto> {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return plainToInstance(PostResDto, post, {
      excludeExtraneousValues: true, enableImplicitConversion: true
    });
  }

  async indexPost(page: number, limit: number, user: UserInfo): Promise<IndexPostResDto> {
    let res = await paginate<Post>(this.postRepository, { page, limit }, { user_id: user.id });
    return plainToInstance(IndexPostResDto, res, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }


}