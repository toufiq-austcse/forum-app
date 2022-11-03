import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentReqDto {
  @ApiProperty()
  @IsNotEmpty()
  body: string;
}