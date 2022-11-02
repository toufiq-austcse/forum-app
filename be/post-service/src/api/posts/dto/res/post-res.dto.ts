import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
}