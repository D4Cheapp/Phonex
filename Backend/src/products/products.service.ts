import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fs from 'fs';
import path from 'path';
import { ProductCategory } from 'src/products-category/product-category.entity';
import { createPaginationData } from 'src/utils/createPaginationData';
import { DataSource } from 'typeorm';
import { Like } from 'typeorm';

import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductsDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private dataSource: DataSource) {}

  async getAllProducts(query: ProductsDto) {
    const { page, perPage, search, category } = query;
    const skip = page > 0 ? (page - 1) * perPage : 0;
    const productCategory = (category ? { id: category } : {}) as number;
    const [products, count] = await this.dataSource.getRepository(Product).findAndCount({
      where: [
        search
          ? {
              name: Like(`%${search}%`),
            }
          : {},
        category
          ? {
              productCategory,
            }
          : {},
      ],
      skip,
      take: perPage,
    });
    return createPaginationData(page, perPage, count, products);
  }

  async getProductById(id: number) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneBy({ id })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const category = await this.dataSource
      .getRepository(ProductCategory)
      .findOneBy({ id: product.productCategory })
      .catch(() => {
        throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      });
    if (!category?.id) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);

    return {
      ...product,
      category,
    };
  }

  async createProduct(productDto: ProductDto, imagePath: string) {
    const fileName = path.join(__dirname, '../uploads', path.parse(imagePath).base);
    const product = await this.dataSource
      .getRepository(Product)
      .save({
        name: productDto.name,
        description: productDto.description,
        image: `files/${path.parse(imagePath).base}`,
        price: productDto.price,
        productCategoryId: productDto.productCategoryId,
      })
      .catch(() => {
        fs.unlink(fileName, (err) => {
          console.log(err);
        });
        throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
      });
    return product;
  }

  async updateProductImage(id: number, productDto: ProductDto, imagePath: string) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneBy({ id })
      .catch(() => {
        fs.unlink(path.join(__dirname, '../uploads', path.parse(imagePath).base), (err) => {
          console.log(err);
        });
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const updatedImage = `files/${path.parse(imagePath).base}`;
    await this.dataSource
      .getRepository(Product)
      .update({ id: product.id }, { ...productDto, image: updatedImage })
      .catch(() => {
        fs.unlink(path.join(__dirname, '../uploads', path.parse(imagePath).base), (err) => {
          console.log(err);
        });
        throw new HttpException('Product updating error', HttpStatus.BAD_REQUEST);
      });

    fs.unlink(path.join(__dirname, '../uploads', path.parse(product.image).base), (err) => {
      console.log(err);
    });
    return { id: product.id, ...productDto, image: updatedImage };
  }

  async deleteProductById(id: number) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneBy({ id })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const deletedProduct = await this.dataSource
      .getRepository(Product)
      .delete({ id })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (deletedProduct.affected === 0)
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    fs.unlink(path.join(__dirname, '../uploads', path.parse(product.image).base), (err) =>
      console.log(err)
    );
  }
}
