import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ProductCategory } from 'src/products-category/product-category.entity';
import { DataSource } from 'typeorm';

import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private dataSource: DataSource) {}

  async getProductById(id: number) {
    const product = await this.dataSource.getRepository(Product).findOneBy({ id });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const category = await this.dataSource
      .getRepository(ProductCategory)
      .findOneBy({ id: product.productCategoryId });
    if (!category?.id) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);

    return {
      ...product,
      category,
    };
  }
}
