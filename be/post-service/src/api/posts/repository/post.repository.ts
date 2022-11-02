import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  // @ts-ignore
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.manager);
  }
}