import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { UsersController } from './users/users.controller';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { ShopModule } from './shop/shop.module';

@Module({
  controllers: [UsersController, ShopController],
  providers: [UsersService, RoleService, ShopService],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      entities: [User, Role],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RoleModule,
    ShopModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
