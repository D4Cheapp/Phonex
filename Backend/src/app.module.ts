import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { ProductCategory } from './products-category/product-category.entity';
import { ProductCategoryModule } from './products-category/product-category.module';
import { Product } from './products/product.entity';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { Shop } from './shop/shop.entity';
import { ShopModule } from './shop/shop.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';

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
      entities: [User, Role, Shop, ProductCategory, Product],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RoleModule,
    ShopModule,
    AuthModule,
    ProductCategoryModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
