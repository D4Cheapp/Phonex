import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fs from 'fs';
import path from 'path';
import { ProductCategory } from 'src/products-category/product-category.entity';
import { DataSource } from 'typeorm';

import { ProductDto } from './product.dto';
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

  async createProduct(productDto: ProductDto, imagePath: string) {
    const product = await this.dataSource
      .getRepository(Product)
      .save({
        name: productDto.name,
        description: productDto.description,
        image: path.parse(imagePath).base,
        price: productDto.price,
        productCategoryId: productDto.productCategoryId,
      })
      .catch(() => {
        fs.unlinkSync(path.join('uploads', 'products', path.parse(imagePath).base));
        throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
      });
    return product;
  }
}
