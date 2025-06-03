import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/product/product.entity';
import { Shop } from 'src/shop/shop.entity';
import { Supplier } from 'src/supplier/supplier.entity';

import { ProductSupplierController } from './product-supplier.controller';
import { ProductSupplier } from './product-supplier.entity';
import { ProductSupplierService } from './product-supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSupplier, Supplier, Product, Shop])],
  controllers: [ProductSupplierController],
  providers: [ProductSupplierService],
  exports: [ProductSupplierService],
})
export class ProductSupplierModule {}
