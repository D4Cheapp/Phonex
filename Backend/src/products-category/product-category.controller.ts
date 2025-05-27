import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductCategoryDto } from './product-category.dto';
import { ProductCategoryService } from './product-category.service';

@ApiTags('Product category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private ProductCategoryService: ProductCategoryService) {}

  @Get()
  async getAllProductCategories() {
    return this.ProductCategoryService.getAllProductCategories();
  }

  @Post()
  async createProductCategory(@Body() body: ProductCategoryDto) {
    return this.ProductCategoryService.createProductCategory(body.name);
  }

  @Patch(':id')
  async updateProductCategory(@Param('id') id: number, @Body() body: ProductCategoryDto) {
    await this.ProductCategoryService.updateProductCategory(id, body.name);
    return { message: 'Category updated successfully' };
  }

  @Delete(':id')
  async deleteProductCategory(@Param('id') id: number) {
    await this.ProductCategoryService.deleteProductCategory(id);
    return { message: 'Category deleted successfully' };
  }
}
