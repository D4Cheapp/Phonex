import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModule } from 'src/role/role.module';
import { ShopModule } from 'src/shop/shop.module';

import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SALT,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    RoleModule,
    ShopModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
