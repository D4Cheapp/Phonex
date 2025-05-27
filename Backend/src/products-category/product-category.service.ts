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

  async updateProductCategory(id: number, categoryName: string) {
    const category = await this.dataSource
      .getRepository(ProductCategory)
      .update({ id }, { name: categoryName })
      .catch(() => {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      });

    return category;
  }
}
