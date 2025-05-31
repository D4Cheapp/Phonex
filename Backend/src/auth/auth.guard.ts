import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from 'src/auth/auth.service';
import { RolesD } from 'src/role/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(RolesD, context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();

    const cookies = req.headers.cookie?.split('access_token=')[1].split(';')[0];
    if (!cookies) throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);

    const user = await this.authService.parseToken(req);
    const isValidRole = roles.includes(user.role.name);
    if (!isValidRole) throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);

    return true;
  }
}
