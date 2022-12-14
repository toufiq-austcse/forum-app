import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreatePostReqDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  content: string = null;


  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  is_published: boolean;
}

export class UpdatePostReqDto extends PartialType(CreatePostReqDto) {

}