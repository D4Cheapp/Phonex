import { ApiProperty } from '@nestjs/swagger';

export class ProductsDto {
  @ApiProperty({ required: false, default: 1 })
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  perPage: number = 10;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  category?: number;
}
