import { Body, Controller, Get, Post, Response } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';

import { LoginUserDto, RegisterUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('login')
  async login(@Body() body: LoginUserDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const { user, token } = await this.usersService.login(body);
    res.cookie('access_token', token);
    return user;
  }

  @Post('register')
  async register(
    @Body() body: RegisterUserDto,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    const { user, token } = await this.usersService.registerUser(body);
    res.cookie('access_token', token);
    return user;
  }
}
