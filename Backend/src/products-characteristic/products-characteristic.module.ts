import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCharacteristic } from './product-characteristic.entity';
import { ProductsCharacteristicService } from './products-characteristic.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCharacteristic])],
  providers: [ProductsCharacteristicService],
  exports: [ProductsCharacteristicService],
})
export class ProductsCharacteristicModule {}
