import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class PaginationMetaResDto {

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.totalItems)
  total_items: number;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.itemCount)
  item_count: number;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.itemsPerPage)
  items_per_page: number;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.totalPages)
  total_pages: number;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.currentPage)
  current_page: number;
}