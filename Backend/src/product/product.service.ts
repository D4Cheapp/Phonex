import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import console from 'console';
import fs from 'fs';
import path from 'path';
import { ProductCategory } from 'src/products-category/product-category.entity';
import { ProductsCharacteristicService } from 'src/products-characteristic/products-characteristic.service';
import { DataSource } from 'typeorm';
import { Like } from 'typeorm';

import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductsDto } from './products.dto';

@Injectable()
export class ProductService {
  constructor(
    private dataSource: DataSource,
    private productsCharacteristicService: ProductsCharacteristicService
  ) {}

  async getAllProducts(query: ProductsDto) {
    const { search, category } = query;
    const where: any = {};

    if (category) {
      where.product_category = { id: category };
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }

    return await this.dataSource.getRepository(Product).find({
      where,
      relations: ['product_category'],
    });
  }

  async getProductById(id: number) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOne({ where: { id }, relations: ['product_category'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const characteristics = await this.productsCharacteristicService.getProductCharacteristics(
      product.id
    );

    return {
      ...product,
      characteristics,
    };
  }

  async createProduct(productDto: ProductDto, imagePath: string) {
    await this.dataSource
      .getRepository(ProductCategory)
      .findOneBy({
        id: productDto.product_category_id,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const fileName = path.join(__dirname, '../uploads', path.parse(imagePath).base);
    const product = await this.dataSource
      .getRepository(Product)
      .save({
        name: productDto.name,
        description: productDto.description,
        image: `files/${path.parse(imagePath).base}`,
        price: productDto.price,
        product_category: { id: productDto.product_category_id },
      })
      .catch((e) => {
        fs.unlink(fileName, (err) => {
          console.error(err);
        });
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const characteristics = await this.productsCharacteristicService.createProductCharacteristics(
      productDto.characteristics,
      product.id
    );
    return { product, characteristics };
  }

  async updateProduct(id: number, productDto: ProductDto, imagePath?: string) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOne({ where: { id }, relations: ['product_category'] })
      .catch((e) => {
        if (imagePath) {
          fs.unlink(path.join(__dirname, '../uploads', path.parse(imagePath).base), (err) => {
            console.error(err);
          });
        }
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const updatedImage = imagePath ? `files/${path.parse(imagePath).base}` : product.image;
    await this.dataSource
      .getRepository(Product)
      .update(
        { id: product.id },
        {
          name: productDto.name,
          description: productDto.description,
          image: updatedImage,
          price: productDto.price,
          product_category: { id: productDto.product_category_id },
        }
      )
      .catch((e) => {
        if (imagePath) {
          fs.unlink(path.join(__dirname, '../uploads', path.parse(imagePath).base), (err) => {
            console.error(err);
          });
        }
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    fs.unlink(path.join(__dirname, '../uploads', path.parse(product.image).base), (err) => {
      console.error(err);
    });

    await this.productsCharacteristicService.updateProductCharacteristics(
      productDto.characteristics
    );

    return {
      product: await this.dataSource
        .getRepository(Product)
        .findOne({ where: { id }, relations: ['product_category'] })
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }),
      characteristics: await this.productsCharacteristicService.getProductCharacteristics(id),
    };
  }

  async deleteProductById(id: number) {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneBy({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (!product?.id) throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    const deletedProduct = await this.dataSource
      .getRepository(Product)
      .delete({ id })
      .catch((e) => {
        console.error(e);
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      });
    if (deletedProduct.affected === 0)
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);

    fs.unlink(path.join(__dirname, '../uploads', path.parse(product.image).base), (err) =>
      console.error(err)
    );
  }
}
