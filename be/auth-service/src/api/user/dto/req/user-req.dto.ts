import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchUserDetailsReqDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  user_ids: string[];
}