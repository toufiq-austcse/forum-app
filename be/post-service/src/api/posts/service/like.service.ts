import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { LikeRepository } from '../repository/like.repository';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { LikeReqDto } from '../dto/req/like-req.dto';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../entity/post.entity';
import { Like } from '../entity/like.entity';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository, private postRepository: PostRepository) {
  }

  async likePost(likeReq: LikeReqDto, user: UserInfo) {
    let post = await this.postRepository.findOne({ where: { id: likeReq.post_id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    let alreadyLiked = await this.likeRepository.findOne({ where: { post, user_id: user.id } });
    if (alreadyLiked) {
      throw new NotAcceptableException('Already liked');
    }
    let likeObj = this.getLikeObj(post, user);
    let newLike = await this.likeRepository.save(likeObj);
    await this.postRepository.incrementNoOfLikes(post.id);
    return newLike;
  }

  async unlikePost(likeReq: LikeReqDto, user: UserInfo) {
    let post = await this.postRepository.findOne({ where: { id: likeReq.post_id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    let deleteRes = await this.likeRepository.delete({ post, user_id: user.id });
    if (deleteRes.affected > 0) {
      await this.postRepository.decrementNoOfLikes(post.id);
    }

  }

  private getLikeObj(post: Post, user: UserInfo): Like {
    return this.likeRepository.create({
      post,
      user_id: user.id
    });
  }
}