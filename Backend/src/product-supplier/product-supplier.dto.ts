import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductSupplierDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_primary: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shop_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplier_id: number;
}
