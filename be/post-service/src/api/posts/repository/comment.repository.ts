import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  // @ts-ignore
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.manager);
  }
}