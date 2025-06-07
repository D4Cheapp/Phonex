import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class SupplyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shop_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplier_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supply_status_id: number;

  @ApiProperty({
    type: 'array',
    example: [
      {
        product_id: 1,
        quantity: 10,
      },
    ],
  })
  @IsNumber()
  @IsNotEmpty()
  supply_items: { product_id: number; quantity: number }[];
}

export class ChangeSupplyStatusDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supply_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supply_status_id: number;
}
