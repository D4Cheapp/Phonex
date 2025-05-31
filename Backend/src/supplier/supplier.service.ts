import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { SupplierDto } from './supplier.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllSuppliers() {
    return await this.dataSource
      .getRepository(Supplier)
      .find()
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createSupplier(supplierDto: SupplierDto) {
    return await this.dataSource
      .getRepository(Supplier)
      .save(supplierDto)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateSupplier(id: number, supplierDto: SupplierDto) {
    await this.dataSource
      .getRepository(Supplier)
      .update(id, supplierDto)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return {
      id,
      ...supplierDto,
    };
  }

  async deleteSupplier(id: number) {
    await this.dataSource
      .getRepository(Supplier)
      .delete(id)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }
}
