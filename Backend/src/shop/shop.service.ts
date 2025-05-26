import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(private dataSource: DataSource) {}

  getShopById(id: number) {
    const shop = this.dataSource.getRepository(Shop).findOneBy({ id });

    if (!shop) throw new HttpException('Shop not found', HttpStatus.BAD_REQUEST);

    return shop;
  }
}
