import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ProductCharacteristic } from './product-characteristic.entity';

@Injectable()
export class ProductsCharacteristicService {
  constructor(private dataSource: DataSource) {}

  async createProductCharacteristics(
    characteristics: { name: string; value: string }[],
    productId: number
  ) {
    return await Promise.all(
      characteristics.flatMap(async (characteristic) => {
        try {
          return await this.dataSource
            .getRepository(ProductCharacteristic)
            .save({
              name: characteristic.name,
              value: characteristic.value,
              product: { id: productId },
            })
            .then((data) => ({
              id: data.id,
              name: data.name,
              value: data.value,
            }))
            .catch(() => {
              throw new HttpException('Characteristics creation failed', HttpStatus.BAD_REQUEST);
            });
        } catch (error) {
          console.error(error);
          throw new HttpException('Invalid characteristic format', HttpStatus.BAD_REQUEST);
        }
      })
    );
  }

  async getProductCharacteristics(productId: number) {
    return await this.dataSource
      .getRepository(ProductCharacteristic)
      .find({ where: { product: { id: productId } } })
      .catch(() => {
        throw new HttpException('Characteristics not found', HttpStatus.BAD_REQUEST);
      });
  }

  async updateProductCharacteristics(
    characteristics: { id: number; name: string; value: string }[]
  ) {
    return await Promise.all(
      characteristics.flatMap(async (characteristic) => {
        try {
          if (!characteristic.id) {
            throw new HttpException('Invalid characteristic format', HttpStatus.BAD_REQUEST);
          }
          return await this.dataSource
            .getRepository(ProductCharacteristic)
            .update(
              { id: characteristic.id },
              { name: characteristic.name, value: characteristic.value }
            )
            .catch(() => {
              throw new HttpException('Characteristics update failed', HttpStatus.BAD_REQUEST);
            });
        } catch (error) {
          console.error(error);
          throw new HttpException('Invalid characteristic format', HttpStatus.BAD_REQUEST);
        }
      })
    );
  }
}
