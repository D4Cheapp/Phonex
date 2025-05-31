import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WarehouseProductModule } from 'src/warehouse-product/warehouse-product.module';

import { SaleItem } from './sale-item.entity';
import { SaleController } from './sale.controller';
import { Sale } from './sale.entity';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem]), WarehouseProductModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
