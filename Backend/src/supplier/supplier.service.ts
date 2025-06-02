import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource, Like } from 'typeorm';

import { SupplierDto } from './supplier.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllSuppliers({ name, email, phone }: { name?: string; email?: string; phone?: string }) {
    const where: any = {};
    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (phone) where.phone = Like(`%${phone}%`);
    return await this.dataSource
      .getRepository(Supplier)
      .find({ where })
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
