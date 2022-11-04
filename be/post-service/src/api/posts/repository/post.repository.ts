import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  // @ts-ignore
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.manager);
  }

  async incrementNoOfComments(postId: number) {
    await this.increment({ id: postId }, 'no_of_comments', 1);
  }

  async decrementNoOfComments(postId: number) {
    await this.decrement({ id: postId }, 'no_of_comments', 1);
  }

  async incrementNoOfLikes(postId: number) {
    await this.increment({ id: postId }, 'no_of_likes', 1);
  }

  async decrementNoOfLikes(postId: number) {
    await this.decrement({ id: postId }, 'no_of_likes', 1);
  }
}