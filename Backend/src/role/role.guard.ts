import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from 'src/auth/auth.service';

import { RolesDecorator } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>(RolesDecorator, context.getHandler());
    const req = context.switchToHttp().getRequest();

    const cookies = req.headers.cookie?.split('access_token=')[1];
    if (!cookies) throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    const user = await this.authService.parseToken(cookies);
    const isValidRole = roles.includes(user.role.name);
    if (!isValidRole) throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);

    return true;
  }
}
