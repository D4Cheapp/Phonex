import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WarehouseProduct } from 'src/warehouse-product/warehouse-product.entity';
import { WarehouseProductModule } from 'src/warehouse-product/warehouse-product.module';

import { SupplyItem } from './supply-item.entity';
import { SupplyStatus } from './supply-status.entity';
import { SupplyController } from './supply.controller';
import { Supply } from './supply.entity';
import { SupplyService } from './supply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supply, SupplyStatus, SupplyItem, WarehouseProduct]),
    WarehouseProductModule,
  ],
  controllers: [SupplyController],
  providers: [SupplyService],
})
export class SupplyModule {}
