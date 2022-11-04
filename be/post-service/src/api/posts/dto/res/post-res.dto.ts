import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { PaginationMetaResDto } from '@common/dto/pagination-meta-res.dto';

export class PostResDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  is_published: boolean;

  @ApiProperty()
  @Expose()
  user_id: string;

  @ApiProperty()
  @Expose()
  no_of_comments: number;

  @ApiProperty()
  @Expose()
  no_of_likes: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class IndexPostResDto {
  @ApiProperty({ type: [PostResDto] })
  @Expose()
  @Transform(val => plainToInstance(PostResDto, val.obj.items, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  posts: PostResDto[];

  @ApiProperty()
  @Expose()
  @Transform(val => plainToInstance(PaginationMetaResDto, val.obj.meta, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  pagination_meta: PaginationMetaResDto;
}


export class PostUser {
  @ApiProperty()
  @Expose()
  username: string;
}

export class FeedPostResDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  is_published: boolean;

  @ApiProperty()
  @Expose()
  user_id: string;

  @ApiProperty()
  @Expose()
  no_of_comments: number;

  @ApiProperty()
  @Expose()
  no_of_likes: number;

  @ApiProperty()
  @Expose()
  user: PostUser;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class IndexFeedPostResDto {
  @ApiProperty({ type: [FeedPostResDto] })
  @Expose()
  @Transform(val => plainToInstance(FeedPostResDto, val.obj.items, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  posts: FeedPostResDto[];

  @ApiProperty()
  @Expose()
  @Transform(val => plainToInstance(PaginationMetaResDto, val.obj.meta, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true
  }))
  pagination_meta: PaginationMetaResDto;
}