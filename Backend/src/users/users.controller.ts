import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
} from '@nestjs/common';

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { LoginUserDto, RegisterUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('login')
  async login(@Body() body: LoginUserDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const user = await this.usersService.login(body, res);
    return user;
  }

  @Get('current')
  async getCurrentUser(@Request() req: ExpressRequest) {
    return this.authService.parseToken(req);
  }

  @RolesD([Roles.MANAGER])
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('register')
  async register(
    @Body() body: RegisterUserDto,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    return await this.usersService.registerUser(body, res);
  }

  @RolesD([Roles.MANAGER])
  @Patch(':id')
  async updateUserById(@Param('id') id: number, @Body() body: RegisterUserDto) {
    return this.usersService.updateUserById(id, body);
  }

  @Delete('logout')
  async logout(@Response({ passthrough: true }) res: ExpressResponse) {
    await this.authService.logout(res);
    return { message: 'User logged out successfully' };
  }

  @RolesD([Roles.MANAGER])
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.usersService.deleteUserById(id);
    return { message: 'User deleted successfully' };
  }
}
