import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentReqDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  post_id: number;

  @ApiProperty()
  @IsNotEmpty()
  body: string;
}

export class UpdateCommentReqDto extends PartialType(CreateCommentReqDto) {

}