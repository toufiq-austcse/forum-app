import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {

  constructor(dataSource: DataSource) {
    super(Comment, dataSource.manager);
  }
}