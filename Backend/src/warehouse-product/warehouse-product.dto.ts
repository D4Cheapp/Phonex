import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWarehouseProductDto {
  @ApiProperty({ description: 'ID of the product' })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'ID of the shop' })
  @IsInt()
  @IsNotEmpty()
  shop_id: number;
}
