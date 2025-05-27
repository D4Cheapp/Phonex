import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductsCategoryService {
  constructor(private dataSource: DataSource) {}

  async createProductCategory(categoryName: string) {
    const category = await this.dataSource
      .getRepository(ProductCategory)
      .save({
        name: categoryName,
      })
      .catch(() => {
        throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
      });

    return category;
  }

  async deleteProductCategory(id: number) {
    await this.dataSource
      .getRepository(ProductCategory)
      .delete({ id })
      .catch(() => {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      });
  }
}
