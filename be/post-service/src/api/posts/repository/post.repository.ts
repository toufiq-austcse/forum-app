import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { IPaginationMeta, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostRepository extends Repository<Post> {

  constructor(dataSource: DataSource) {
    super(Post, dataSource.manager);
  }

  async filterPosts(query: {
    page: number,
    limit: number,
    user_id?: string,
    sort_by_created_at?: 'ASC' | 'DESC'
    is_published?: boolean,

  }): Promise<{ items: Post[], meta: IPaginationMeta }> {
    let queryBuilder = this.createQueryBuilder('post');
    if (query.user_id) {
      queryBuilder.where('post.user_id=:user_id', { user_id: query.user_id });
    }
    if (query.is_published) {
      queryBuilder.andWhere('post.is_published=:is_published', { is_published: query.is_published });
    }
    if (query.sort_by_created_at) {
      queryBuilder.orderBy('post.createdAt', query.sort_by_created_at);
    }
    queryBuilder.select(['post.id', 'post.title', 'post.content', 'post.no_of_comments', 'post.user_id', 'post.no_of_likes', 'post.createdAt', 'post.updatedAt']);

    return await paginate<Post>(queryBuilder, { page: query.page, limit: query.limit });

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