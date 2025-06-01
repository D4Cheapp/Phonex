import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ProductCategory } from 'src/products-category/product-category.entity';
import { ProductCharacteristic } from 'src/products-characteristic/product-characteristic.entity';
import { ProductsCharacteristicModule } from 'src/products-characteristic/products-characteristic.module';

import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, ProductCharacteristic]),
    AuthModule,
    ProductsCharacteristicModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
