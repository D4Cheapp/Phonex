import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcrypt';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { HASH_COST } from 'src/constants/hash-cost';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getTokenData(cookies: string) {
    return await this.jwtService.verifyAsync(cookies, {
      secret: process.env.JWT_SALT,
    });
  }

  async createThrottleToken() {
    const tokenPayload = {
      failedAttempts: 1,
      lastFailedAttempt: new Date().getTime(),
    };
    return await this.jwtService
      .signAsync(tokenPayload, {
        secret: process.env.JWT_SALT,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateThrottleToken(failedAttempts: number, lastFailedAttempt: number) {
    const tokenPayload = {
      failedAttempts,
      lastFailedAttempt,
    };
    return await this.jwtService
      .signAsync(tokenPayload, {
        secret: process.env.JWT_SALT,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createUserToken(user: User) {
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      shop: user.shop,
    };
    return await this.jwtService
      .signAsync(tokenPayload, {
        secret: process.env.JWT_SALT,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createHashPassword(password: string) {
    return hash(password, HASH_COST);
  }

  async compareHashPassword(password: string, hashPassword: string) {
    const isCorrect = await compare(password, hashPassword);
    if (!isCorrect) throw new HttpException('Password is not correct', HttpStatus.BAD_REQUEST);
  }

  async parseToken(req: ExpressRequest) {
    const cookies = req.headers.cookie?.split('=')[1].split(';')[0];
    if (!cookies) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const user = await this.jwtService.verifyAsync(cookies, {
      secret: process.env.JWT_SALT,
    });
    if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      shop: user.shop,
    };
  }

  async logout(res: ExpressResponse) {
    res.clearCookie('access_token');
    return { message: 'User logged out successfully' };
  }
}
