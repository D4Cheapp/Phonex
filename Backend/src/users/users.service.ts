import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcrypt';
import { HASH_COST } from 'src/constants/hash-cost';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { Shop } from 'src/shop/shop.entity';
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
    private jwtService: JwtService
  ) {}

  async createUserToken(user: User, role: Role, shop: Shop) {
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role,
      shop,
    };
    return await this.jwtService.signAsync(tokenPayload);
  }

  async createHashPassword(password: string) {
    return hash(password, HASH_COST);
  }

  async compareHashPassword(password: string, hashPassword: string) {
    return compare(password, hashPassword, (err, res) => {
      if (err) throw err;
      if (!res) throw new HttpException('Password is not correct', HttpStatus.BAD_REQUEST);
    });
  }

  async login(loginUser: LoginUserDto) {
    const dbUser = await this.dataSource.getRepository(User).findOneBy({
      email: loginUser.email,
    });
    if (!dbUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    await this.compareHashPassword(loginUser.password, dbUser.password);

    const role = await this.roleService.getRoleById(dbUser.roleId);
    const shop = await this.shopService.getShopById(dbUser.shopId);
    if (!role || !shop) throw new HttpException('Role or shop not found', HttpStatus.BAD_REQUEST);

    const token = await this.createUserToken(dbUser, role, shop);
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

    const hashPassword = await this.createHashPassword(registerUser.password);
    const user = await this.dataSource.getRepository(User).save({
      name: registerUser.name,
      email: registerUser.email,
      password: hashPassword,
      shop: shop,
      role: role,
    });
    const token = await this.createUserToken(user, role, shop);

    return { user, token };
  }
}
