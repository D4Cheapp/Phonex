import { Controller, Get, Param } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }
}
