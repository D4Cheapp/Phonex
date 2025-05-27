import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(private dataSource: DataSource) {}

  getRoleById(id: number) {
    const role = this.dataSource.getRepository(Role).findOneBy({ id });

    if (!role) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);

    return role;
  }
}
