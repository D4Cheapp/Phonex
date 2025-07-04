import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_category_id: number;

  @ApiProperty({
    type: 'array',
    example: [
      {
        name: 'color',
        value: 'red',
      },
    ],
  })
  @IsString()
  @IsNotEmpty()
  characteristics: { id: number; name: string; value: string }[];
}
