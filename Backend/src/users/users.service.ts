import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RoleService } from 'src/role/role.service';
import { ShopService } from 'src/shop/shop.service';
import { DataSource } from 'typeorm';

import { LoginUserDto, RegisterUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private shopService: ShopService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  async getUserById(id: number) {
    const user = await this.dataSource.getRepository(User).findOneBy({ id });
    if (!user?.id) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: await this.roleService.getRoleById(user.roleId),
      shop: await this.shopService.getShopById(user.shopId),
    };
  }

  async getUserRoleAndShop(shopId: number, roleId: number) {
    const role = await this.roleService.getRoleById(roleId);
    const shop = await this.shopService.getShopById(shopId);
    if (!role || !shop) throw new HttpException('Role or shop not found', HttpStatus.BAD_REQUEST);
    return {
      role,
      shop,
    };
  }

  async deleteUserById(id: number) {
    const user = await this.dataSource.getRepository(User).delete({ id });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async login(loginUser: LoginUserDto, res: ExpressResponse) {
    const dbUser = await this.dataSource.getRepository(User).findOneBy({
      email: loginUser.email,
    });
    if (!dbUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    await this.authService.compareHashPassword(loginUser.password, dbUser.password);

    const role = await this.roleService.getRoleById(dbUser.roleId);
    const shop = await this.shopService.getShopById(dbUser.shopId);
    if (!role || !shop) throw new HttpException('Role or shop not found', HttpStatus.BAD_REQUEST);

    const token = await this.authService.createUserToken(dbUser, role, shop);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
    });

    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role,
      shop,
    };
  }

  async registerUser(registerUser: RegisterUserDto, res: ExpressResponse) {
    const { shop, role } = await this.getUserRoleAndShop(registerUser.shopId, registerUser.roleId);

    const hashPassword = await this.authService.createHashPassword(registerUser.password);
    const user = await this.dataSource
      .getRepository(User)
      .save({
        name: registerUser.name,
        email: registerUser.email,
        password: hashPassword,
        shop: shop,
        role: role,
      })
      .catch(() => {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      });
    const token = await this.authService.createUserToken(user, role, shop);
    res.cookie('access_token', token);

    return user;
  }

  async updateUserById(id: number, updateUser: RegisterUserDto) {
    const { shop, role } = await this.getUserRoleAndShop(updateUser.shopId, updateUser.roleId);

    const user = await this.dataSource
      .getRepository(User)
      .update({ id }, updateUser)
      .catch(() => {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      });
    if (user.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return {
      id,
      name: updateUser.name,
      email: updateUser.email,
      role,
      shop,
    };
  }
}
