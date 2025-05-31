import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WarehouseProductController } from './warehouse-product.controller';
import { WarehouseProduct } from './warehouse-product.entity';
import { WarehouseProductService } from './warehouse-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseProduct])],
  controllers: [WarehouseProductController],
  providers: [WarehouseProductService],
  exports: [WarehouseProductService],
})
export class WarehouseProductModule {}
