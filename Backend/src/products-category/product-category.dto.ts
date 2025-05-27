import { IsString } from 'class-validator';

export class ProductCategoryDto {
  @IsString()
  name: string;
}
