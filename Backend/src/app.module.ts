import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { ShopController } from './shop/shop.controller';
import { ShopModule } from './shop/shop.module';
import { ShopService } from './shop/shop.service';
import { UsersController } from './users/users.controller';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  controllers: [UsersController, ShopController],
  providers: [UsersService, RoleService, ShopService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
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
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
