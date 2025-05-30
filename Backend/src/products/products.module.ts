import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ProductCategory } from 'src/products-category/product-category.entity';
import { ProductCharacteristic } from 'src/products-characteristic/product-characteristic.entity';
import { ProductsCharacteristicModule } from 'src/products-characteristic/products-characteristic.module';

import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, ProductCharacteristic]),
    AuthModule,
    ProductsCharacteristicModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
