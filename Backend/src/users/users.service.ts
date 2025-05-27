import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
    if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: await this.roleService.getRoleById(user.roleId),
      shop: await this.shopService.getShopById(user.shopId),
    };
  }

  async login(loginUser: LoginUserDto) {
    const dbUser = await this.dataSource.getRepository(User).findOneBy({
      email: loginUser.email,
    });
    if (!dbUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    await this.authService.compareHashPassword(loginUser.password, dbUser.password);

    const role = await this.roleService.getRoleById(dbUser.roleId);
    const shop = await this.shopService.getShopById(dbUser.shopId);
    if (!role || !shop) throw new HttpException('Role or shop not found', HttpStatus.BAD_REQUEST);

    const token = await this.authService.createUserToken(dbUser, role, shop);
    const user = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role,
      shop,
    };
    return { user, token };
  }

  async registerUser(registerUser: RegisterUserDto) {
    const shop = await this.shopService.getShopById(registerUser.shopId);
    const role = await this.roleService.getRoleById(registerUser.roleId);
    if (!shop || !role) throw new HttpException('Shop or role not found', HttpStatus.BAD_REQUEST);

    const hashPassword = await this.authService.createHashPassword(registerUser.password);
    const user = await this.dataSource.getRepository(User).save({
      name: registerUser.name,
      email: registerUser.email,
      password: hashPassword,
      shop: shop,
      role: role,
    });
    const token = await this.authService.createUserToken(user, role, shop);

    return { user, token };
  }
}
