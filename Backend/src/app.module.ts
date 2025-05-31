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
import { Shop } from './shop/shop.entity';
import { ShopModule } from './shop/shop.module';
import { Supplier } from './supplier/supplier.entity';
import { SupplierModule } from './supplier/supplier.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { Warehouse } from './warehouse/warehouse.entity';
import { WarehouseModule } from './warehouse/warehouse.module';

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
        Warehouse,
        ProductCategory,
        Product,
        ProductCharacteristic,
        Supplier,
        ProductSupplier,
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
    WarehouseModule,
    ProductSupplierModule,
    SupplierModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
