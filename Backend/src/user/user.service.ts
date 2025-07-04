import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { MAX_THROTTLE_REQUESTS, THROTTLE_EXPIRE_TIME } from 'src/constants/max-throttle';
import { DataSource, Like } from 'typeorm';

import { LoginUserDto, RegisterUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService
  ) {}

  async getAllUsers({
    search,
    email,
    shop_id,
    role_id,
  }: {
    search?: string;
    email?: string;
    shop_id?: number;
    role_id?: number;
  }) {
    const where: any = {};
    if (search) where.name = Like(`%${search}%`);
    if (email) where.email = Like(`%${email}%`);
    if (shop_id) where.shop = { id: shop_id };
    if (role_id) where.role = { id: role_id };
    return await this.dataSource
      .getRepository(User)
      .find({ where, relations: ['role', 'shop'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async getUserById(id: number) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: ['role', 'shop'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (!user?.id) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  async deleteUserById(id: number) {
    const user = await this.dataSource.getRepository(User).delete({ id });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async checkThrottleRequest(res: ExpressResponse) {
    const cookies = res.req.headers.cookie?.split('=')[1].split(';')[0];
    if (!cookies) {
      const throttleToken = await this.authService.createThrottleToken();
      res.cookie('access_token', throttleToken, {
        httpOnly: true,
        secure: true,
      });
      return;
    }

    const tokenData = await this.authService.getTokenData(cookies);
    if (!tokenData) return;

    const isThrottleExpired =
      new Date(tokenData.lastFailedAttempt).getTime() + THROTTLE_EXPIRE_TIME < new Date().getTime();
    if (isThrottleExpired && tokenData.failedAttempts !== 0) {
      const throttleToken = await this.authService.createThrottleToken();
      res.cookie('access_token', throttleToken, {
        httpOnly: true,
        secure: true,
      });
      return;
    }

    if (tokenData.failedAttempts >= MAX_THROTTLE_REQUESTS) {
      throw new HttpException('Too many failed attempts', HttpStatus.FORBIDDEN);
    }

    const throttleToken = await this.authService.updateThrottleToken(
      tokenData.failedAttempts + 1,
      new Date().getTime()
    );
    res.cookie('access_token', throttleToken, {
      httpOnly: true,
      secure: true,
    });
  }

  async login(loginUser: LoginUserDto, res: ExpressResponse) {
    await this.checkThrottleRequest(res);

    const dbUser = await this.dataSource
      .getRepository(User)
      .findOne({
        where: {
          email: loginUser.email,
        },
        relations: ['role', 'shop'],
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (!dbUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    await this.authService.compareHashPassword(loginUser.password, dbUser.password);

    const token = await this.authService.createUserToken(dbUser);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
    });

    return dbUser;
  }

  async registerUser(registerUser: RegisterUserDto, res: ExpressResponse) {
    const hashPassword = await this.authService.createHashPassword(registerUser.password);
    return await this.dataSource
      .getRepository(User)
      .save({
        name: registerUser.name,
        email: registerUser.email,
        password: hashPassword,
        ...(registerUser.shop_id && { shop: { id: registerUser.shop_id } }),
        role: { id: registerUser.role_id },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateUserById(id: number, updateUser: RegisterUserDto) {
    const hashPassword = updateUser.password
      ? await this.authService.createHashPassword(updateUser.password)
      : undefined;

    const user = await this.dataSource
      .getRepository(User)
      .update(
        { id },
        {
          name: updateUser.name,
          email: updateUser.email,
          ...(updateUser.password ? { password: hashPassword } : {}),
          shop: { id: updateUser.shop_id },
          role: { id: updateUser.role_id },
        }
      )
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return await this.dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: ['role', 'shop'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }
}
