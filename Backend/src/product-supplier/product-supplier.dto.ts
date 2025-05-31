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
  isPrimary: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;
}
