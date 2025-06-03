import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/product/product.entity';
import { Shop } from 'src/shop/shop.entity';

import { WarehouseProductController } from './warehouse-product.controller';
import { WarehouseProduct } from './warehouse-product.entity';
import { WarehouseProductService } from './warehouse-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseProduct, Product, Shop])],
  controllers: [WarehouseProductController],
  providers: [WarehouseProductService],
  exports: [WarehouseProductService],
})
export class WarehouseProductModule {}
