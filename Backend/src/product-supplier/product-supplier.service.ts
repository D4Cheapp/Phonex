import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ProductSupplierDto } from './product-supplier.dto';
import { ProductSupplier } from './product-supplier.entity';

@Injectable()
export class ProductSupplierService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllProductSuppliers(shopId?: number, productId?: number) {
    const where: any = {};

    if (shopId) {
      where.shop = { id: shopId };
    }

    if (productId) {
      where.product = { id: productId };
    }

    return await this.dataSource
      .getRepository(ProductSupplier)
      .find({
        where,
        relations: ['shop', 'product'],
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createProductSupplier(productSupplierDto: ProductSupplierDto) {
    return await this.dataSource
      .getRepository(ProductSupplier)
      .save(productSupplierDto)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteProductSupplier(id: number) {
    await this.dataSource
      .getRepository(ProductSupplier)
      .delete({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateProductSupplier(id: number, productSupplierDto: ProductSupplierDto) {
    await this.dataSource
      .getRepository(ProductSupplier)
      .update(id, productSupplierDto)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return {
      id,
      ...productSupplierDto,
    };
  }
}
