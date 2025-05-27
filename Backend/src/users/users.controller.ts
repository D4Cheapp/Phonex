import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/constants/roles';
import { RoleGuard } from 'src/role/role.guard';
import { RolesDecorator } from 'src/role/roles.decorator';

import { LoginUserDto, RegisterUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(RoleGuard)
  @RolesDecorator([Roles.ADMIN])
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getCurrentUser(@Request() req: ExpressRequest) {
    const cookies = req.headers.cookie?.split('access_token=')[1];
    if (!cookies) throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    return this.authService.parseToken(cookies);
  }

  @Get('login')
  async login(@Body() body: LoginUserDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const { user, token } = await this.usersService.login(body);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
    });
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
