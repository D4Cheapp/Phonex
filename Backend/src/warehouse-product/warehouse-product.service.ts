import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SaleItem } from 'src/sale/sale-item.entity';
import { SupplyItem } from 'src/supply/supply-item.entity';
import { DataSource } from 'typeorm';

import { CreateWarehouseProductDto } from './warehouse-product.dto';
import { WarehouseProduct } from './warehouse-product.entity';

@Injectable()
export class WarehouseProductService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllWarehouseProducts({ shopId, productId }: { shopId?: number; productId?: number }) {
    const where: any = {};

    if (shopId) {
      where.shop = { id: shopId };
    }

    if (productId) {
      where.product = { id: productId };
    }

    return await this.dataSource
      .getRepository(WarehouseProduct)
      .find({ where, relations: ['product', 'shop'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async getShopWarehouse(id: number) {
    return await this.dataSource
      .getRepository(WarehouseProduct)
      .find({ where: { shop: { id } } })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteWarehouseProduct(id: number) {
    await this.dataSource
      .getRepository(WarehouseProduct)
      .delete({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createWarehouseProduct(createDto: CreateWarehouseProductDto): Promise<WarehouseProduct> {
    return await this.dataSource
      .getRepository(WarehouseProduct)
      .save({
        product: { id: createDto.product_id },
        shop: { id: createDto.shop_id },
        quantity: 0,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateWarehouseProducts(
    shopId: number,
    productSupplier: SupplyItem[] | SaleItem[],
    isSale?: boolean
  ) {
    await Promise.all(
      productSupplier.map(async (item) => {
        const warehouse = await this.dataSource
          .getRepository(WarehouseProduct)
          .findOne({
            where: {
              shop: { id: shopId },
              product: { id: item.product.id },
            },
          })
          .catch((e) => {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
          });

        if (!warehouse?.id) return;

        return await this.dataSource
          .getRepository(WarehouseProduct)
          .update(
            { id: warehouse.id },
            { quantity: warehouse.quantity + (isSale ? -item.quantity : item.quantity) }
          )
          .catch((e) => {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
          });
      })
    );
  }
}
