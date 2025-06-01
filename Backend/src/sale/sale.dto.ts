import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaleDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shop_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    type: 'array',
    example: {
      productId: 1,
      quantity: 10,
    },
  })
  @IsNumber()
  @IsNotEmpty()
  sale_items: { product_id: number; quantity: number }[];
}
