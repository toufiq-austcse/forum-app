import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';

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