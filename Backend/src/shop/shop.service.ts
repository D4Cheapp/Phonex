import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';
import { DataSource, Like } from 'typeorm';

import { ShopDto } from './shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(private dataSource: DataSource) {}

  @RolesD([RolesE.ADMIN])
  async createShop(shopDto: ShopDto) {
    return await this.dataSource
      .getRepository(Shop)
      .save({
        name: shopDto.name,
        address: shopDto.address,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async getAllShops({ name, address }: { name?: string; address?: string }) {
    const where: any = {};
    if (name) where.name = Like(`%${name}%`);
    if (address) where.address = Like(`%${address}%`);
    return await this.dataSource
      .getRepository(Shop)
      .find({ where })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async getShopById(id: number) {
    const shop = await this.dataSource.getRepository(Shop).findOneBy({ id });

    if (!shop) throw new HttpException('Shop not found', HttpStatus.BAD_REQUEST);

    return shop;
  }

  @RolesD([RolesE.ADMIN])
  async updateShop(id: number, shopDto: ShopDto) {
    await this.dataSource
      .getRepository(Shop)
      .update(
        { id },
        {
          name: shopDto.name,
          address: shopDto.address,
        }
      )
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    return { id: Number(id), ...shopDto };
  }

  @RolesD([RolesE.ADMIN])
  async deleteShop(id: number) {
    return await this.dataSource
      .getRepository(Shop)
      .delete({ id })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }
}
