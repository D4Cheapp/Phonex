import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
}
