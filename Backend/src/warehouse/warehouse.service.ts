import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SupplyItem } from 'src/supply/supply-item.entity';
import { DataSource } from 'typeorm';

import { Warehouse } from './warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(private readonly dataSource: DataSource) {}

  async getShopWarehouse(id: number) {
    return await this.dataSource
      .getRepository(Warehouse)
      .find({ where: { shop: { id } } })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteWarehouseProduct(id: number) {
    await this.dataSource
      .getRepository(Warehouse)
      .delete({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateWarehouseProduct(shopId: number, productSupplier: SupplyItem[]) {
    await Promise.all(
      productSupplier.map(async (item) => {
        const warehouse = await this.dataSource
          .getRepository(Warehouse)
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
          .getRepository(Warehouse)
          .update({ id: warehouse.id }, { quantity: warehouse.quantity + item.quantity })
          .catch((e) => {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
          });
      })
    );
  }
}
