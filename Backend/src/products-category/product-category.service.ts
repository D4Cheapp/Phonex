import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(private dataSource: DataSource) {}

  async getAllProductCategories() {
    return this.dataSource.getRepository(ProductCategory).find();
  }

  async createProductCategory(categoryName: string) {
    const category = await this.dataSource
      .getRepository(ProductCategory)
      .save({
        name: categoryName,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return category;
  }

  async deleteProductCategory(id: number) {
    await this.dataSource
      .getRepository(ProductCategory)
      .delete({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateProductCategory(id: number, categoryName: string) {
    const category = await this.dataSource
      .getRepository(ProductCategory)
      .update({ id }, { name: categoryName })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return category;
  }
}
