import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fs from 'fs';
import path from 'path';
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
    const [products, count] = await this.dataSource.getRepository(Product).findAndCount({
      where: [
        search
          ? {
              name: Like(`%${search}%`),
            }
          : {},
        category
          ? {
              productCategory: { id: category },
            }
          : {},
      ],
      relations: ['productCategory'],
      skip,
      take: perPage,
    });
    return createPaginationData(page, perPage, count, products);
  }

  async getProductById(id: number) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOne({ where: { id }, relations: ['productCategory'] })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    return product;
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
        productCategory: { id: productDto.productCategoryId },
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
      .findOne({ where: { id }, relations: ['productCategory'] })
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
      .update(
        { id: product.id },
        {
          name: productDto.name,
          description: productDto.description,
          image: updatedImage,
          price: productDto.price,
          productCategory: { id: productDto.productCategoryId },
        }
      )
      .catch(() => {
        fs.unlink(path.join(__dirname, '../uploads', path.parse(imagePath).base), (err) => {
          console.log(err);
        });
        throw new HttpException('Product updating error', HttpStatus.BAD_REQUEST);
      });

    fs.unlink(path.join(__dirname, '../uploads', path.parse(product.image).base), (err) => {
      console.log(err);
    });
    return await this.dataSource
      .getRepository(Product)
      .findOne({ where: { id }, relations: ['productCategory'] })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
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
