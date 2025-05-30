import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SALT,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [JwtService, AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
