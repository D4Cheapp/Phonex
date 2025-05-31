import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaleDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: 'array',
    example: {
      productId: 1,
      quantity: 10,
    },
  })
  @IsNumber()
  @IsNotEmpty()
  saleItems: { productId: number; quantity: number }[];
}
