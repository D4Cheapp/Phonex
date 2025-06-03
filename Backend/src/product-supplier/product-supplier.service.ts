import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ProductSupplierDto } from './product-supplier.dto';
import { ProductSupplier } from './product-supplier.entity';

@Injectable()
export class ProductSupplierService {
  constructor(private readonly dataSource: DataSource) {}

  async getProductSupplierById(id: number) {
    const productSupplier = await this.dataSource
      .getRepository(ProductSupplier)
      .findOne({
        where: { id },
        relations: ['shop', 'product', 'supplier'],
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    if (!productSupplier) {
      throw new HttpException('Product supplier not found', HttpStatus.NOT_FOUND);
    }

    return productSupplier;
  }

  async getAllProductSuppliers(supplierId?: number) {
    const where: any = {};

    if (supplierId) {
      where.supplier = { id: supplierId };
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
    const { shop_id, product_id, supplier_id } = productSupplierDto;

    const productSupplier = await this.dataSource
      .getRepository(ProductSupplier)
      .save({
        price: productSupplierDto.price,
        is_primary: productSupplierDto.is_primary,
        shop: { id: shop_id },
        product: { id: product_id },
        supplier: { id: supplier_id },
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return productSupplier;
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
    await this.getProductSupplierById(id);

    const { shop_id, product_id, supplier_id, ...rest } = productSupplierDto;

    const updateData: any = { ...rest };

    if (shop_id) updateData.shop = { id: shop_id };
    if (product_id) updateData.product = { id: product_id };
    if (supplier_id) updateData.supplier = { id: supplier_id };

    await this.dataSource.getRepository(ProductSupplier).update(id, updateData);

    return this.getProductSupplierById(id);
  }
}
