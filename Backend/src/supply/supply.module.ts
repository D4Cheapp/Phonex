import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Warehouse } from 'src/warehouse/warehouse.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';

import { SupplyItem } from './supply-item.entity';
import { SupplyStatus } from './supply-status.entity';
import { SupplyController } from './supply.controller';
import { Supply } from './supply.entity';
import { SupplyService } from './supply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supply, SupplyStatus, SupplyItem, Warehouse]),
    WarehouseModule,
  ],
  controllers: [SupplyController],
  providers: [SupplyService],
})
export class SupplyModule {}
