import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class LikeReqDto {
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  post_id: number;
}