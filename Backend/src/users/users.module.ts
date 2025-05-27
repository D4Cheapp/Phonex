import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { ShopModule } from 'src/shop/shop.module';

import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, RoleModule, ShopModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
