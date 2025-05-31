import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ProductSupplier } from './product-supplier/product-supplier.entity';
import { ProductSupplierModule } from './product-supplier/product-supplier.module';
import { ProductCategory } from './products-category/product-category.entity';
import { ProductCategoryModule } from './products-category/product-category.module';
import { ProductCharacteristic } from './products-characteristic/product-characteristic.entity';
import { ProductsCharacteristicModule } from './products-characteristic/products-characteristic.module';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { SaleItem } from './sale/sale-item.entity';
import { Sale } from './sale/sale.entity';
import { SaleModule } from './sale/sale.module';
import { Shop } from './shop/shop.entity';
import { ShopModule } from './shop/shop.module';
import { Supplier } from './supplier/supplier.entity';
import { SupplierModule } from './supplier/supplier.module';
import { SupplyItem } from './supply/supply-item.entity';
import { SupplyStatus } from './supply/supply-status.entity';
import { Supply } from './supply/supply.entity';
import { SupplyModule } from './supply/supply.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { WarehouseProduct } from './warehouse-product/warehouse-product.entity';
import { WarehouseProductModule } from './warehouse-product/warehouse-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        Role,
        Shop,
        WarehouseProduct,
        ProductCategory,
        Product,
        ProductCharacteristic,
        Supplier,
        Supply,
        SupplyStatus,
        SupplyItem,
        ProductSupplier,
        Sale,
        SaleItem,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RoleModule,
    ShopModule,
    AuthModule,
    FilesModule,
    ProductsModule,
    ProductCategoryModule,
    ProductsCharacteristicModule,
    WarehouseProductModule,
    ProductSupplierModule,
    SupplierModule,
    SupplyModule,
    SaleModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
