import { Controller, Delete, Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

import { ProductCategoryDto } from './product-category.dto';
import { ProductsCategoryService } from './products-category.service';

@Controller('products-category')
export class ProductsCategoryController {
  constructor(private productsCategoryService: ProductsCategoryService) {}

  @Post()
  async createProductCategory(@Body() body: ProductCategoryDto) {
    return this.productsCategoryService.createProductCategory(body.name);
  }

  @Delete(':id')
  async deleteProductCategory(@Param('id') id: number) {
    await this.productsCategoryService.deleteProductCategory(id);
    return { message: 'Category deleted successfully' };
  }
}
