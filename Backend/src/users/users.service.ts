import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { DataSource } from 'typeorm';

import { LoginUserDto, RegisterUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService
  ) {}

  async getUserById(id: number) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: ['role', 'shop'] })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      });
    if (!user?.id) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  async deleteUserById(id: number) {
    const user = await this.dataSource.getRepository(User).delete({ id });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async login(loginUser: LoginUserDto, res: ExpressResponse) {
    const dbUser = await this.dataSource
      .getRepository(User)
      .findOne({
        where: {
          email: loginUser.email,
        },
        relations: ['role', 'shop'],
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
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
    const user = await this.dataSource
      .getRepository(User)
      .save({
        name: registerUser.name,
        email: registerUser.email,
        password: hashPassword,
        shop: { id: registerUser.shopId },
        role: { id: registerUser.roleId },
      })
      .catch(() => {
        throw new HttpException('Error while creating user', HttpStatus.BAD_REQUEST);
      });
    const token = await this.authService.createUserToken(user);
    res.cookie('access_token', token);

    return user;
  }

  async updateUserById(id: number, updateUser: RegisterUserDto) {
    const hashPassword = await this.authService.createHashPassword(updateUser.password);
    const user = await this.dataSource
      .getRepository(User)
      .update(
        { id },
        {
          name: updateUser.name,
          email: updateUser.email,
          password: hashPassword,
          shop: { id: updateUser.shopId },
          role: { id: updateUser.roleId },
        }
      )
      .catch(() => {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return await this.dataSource
      .getRepository(User)
      .findOne({ where: { id }, relations: ['role', 'shop'] })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      });
  }
}
