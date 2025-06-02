import { ApiProperty } from '@nestjs/swagger';

export class ProductsDto {
  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  category?: number;
}
