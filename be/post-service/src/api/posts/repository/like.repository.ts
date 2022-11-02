import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from '../entity/like.entity';

@Injectable()
export class LikeRepository extends Repository<Like> {
  // @ts-ignore
  constructor(private dataSource: DataSource) {
    super(Like, dataSource.manager);
  }
}