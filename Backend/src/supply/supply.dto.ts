import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class SupplyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplyStatusId: number;

  @ApiProperty({
    type: 'array',
    example: {
      productId: 1,
      quantity: 10,
    },
  })
  @IsNumber()
  @IsNotEmpty()
  supplyItems: { productId: number; quantity: number }[];
}
