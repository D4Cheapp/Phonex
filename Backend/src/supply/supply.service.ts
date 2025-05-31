import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SupplyStatusE } from 'src/constants/supply-status';
import { ProductSupplier } from 'src/product-supplier/product-supplier.entity';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { DataSource } from 'typeorm';

import { SupplyItem } from './supply-item.entity';
import { SupplyStatus } from './supply-status.entity';
import { SupplyDto } from './supply.dto';
import { Supply } from './supply.entity';

@Injectable()
export class SupplyService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly warehouseService: WarehouseService
  ) {}

  async getSupplyByShopId(shopId: number) {
    return this.dataSource
      .getRepository(Supply)
      .find({
        where: {
          shop: {
            id: shopId,
          },
        },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createSupply(supplyDto: SupplyDto) {
    const supply = await this.dataSource
      .getRepository(Supply)
      .save({
        shop: { id: supplyDto.shopId },
        supplier: { id: supplyDto.supplierId },
        supplyStatus: { id: supplyDto.supplyStatusId },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const products = await Promise.all(
      supplyDto.supplyItems.flatMap(
        async (product) =>
          await this.dataSource.getRepository(ProductSupplier).findOne({
            where: {
              shop: { id: supplyDto.shopId },
              supplier: { id: supplyDto.supplierId },
              product: { id: product.productId },
            },
          })
      )
    )
      .then((products) =>
        products.map((product) => ({
          id: product?.id,
          quantity: supplyDto.supplyItems.find((item) => item.productId === product?.product?.id)
            ?.quantity,
          price: product?.price,
        }))
      )
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const supplyItems = await this.dataSource
      .getRepository(SupplyItem)
      .save(
        products.map((product) => ({
          supply: { id: supply.id },
          product: { id: product.id },
          quantity: product.quantity,
          price: product.price,
        }))
      )
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return { supply, supplyItems };
  }

  async changeSupplyStatus(id: number, supplyStatusId: number) {
    const supply = await this.dataSource
      .getRepository(Supply)
      .findOne({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    if (!supply?.id) throw new HttpException('Supply not found', HttpStatus.BAD_REQUEST);

    await this.dataSource
      .getRepository(Supply)
      .update(id, { supplyStatus: { id: supplyStatusId } })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const supplyStatus = await this.dataSource.getRepository(SupplyStatus).findOne({
      where: {
        id: supplyStatusId,
      },
    });

    if (supplyStatus?.name === SupplyStatusE.ACCEPTED) {
      const supplyItems = await this.dataSource
        .getRepository(SupplyItem)
        .find({
          where: {
            supply: { id },
          },
          relations: {
            product: true,
            supply: true,
          },
        })
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });
      await this.warehouseService.updateWarehouseProduct(supply?.shop.id, supplyItems);
    }

    return supply;
  }
}
