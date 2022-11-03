import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { PaginationMetaResDto } from '@common/dto/pagination-meta-res.dto';
import { PostResDto } from './post-res.dto';

export class CommentUser {
  @ApiProperty()
  @Expose()
  username: string;
}

export class CommentResDto {

  @ApiProperty()
  @Expose()
  @Transform(val => plainToInstance(CommentUser, val.obj.user, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }) ?? null)
  user: CommentUser;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}

export class IndexCommentResDto {
  @ApiProperty({ type: [PostResDto] })
  @Expose()
  @Transform(val => plainToInstance(PostResDto, val.obj.items, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  comments: CommentResDto[];

  @ApiProperty()
  @Expose()
  @Transform(val => plainToInstance(PaginationMetaResDto, val.obj.meta, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  pagination_meta: PaginationMetaResDto;
}