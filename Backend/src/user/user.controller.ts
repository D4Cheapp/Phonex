import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { LoginUserDto, RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  @RolesD([RolesE.ADMIN])
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'shop_id', required: false, type: Number })
  @ApiQuery({ name: 'role_id', required: false, type: Number })
  async getAllUsers(
    @Query('search') search?: string,
    @Query('email') email?: string,
    @Query('shop_id') shop_id?: number,
    @Query('role_id') role_id?: number
  ) {
    return await this.usersService.getAllUsers({ search, email, shop_id, role_id });
  }

  @Get('current')
  async getCurrentUser(@Request() req: ExpressRequest) {
    return await this.authService.parseToken(req);
  }

  @Get(':id')
  @RolesD([RolesE.ADMIN])
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const user = await this.usersService.login(body, res);
    return user;
  }

  @Post('register')
  @RolesD([RolesE.ADMIN])
  async register(
    @Body() body: RegisterUserDto,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    return await this.usersService.registerUser(body, res);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN])
  async updateUserById(@Param('id') id: number, @Body() body: RegisterUserDto) {
    return await this.usersService.updateUserById(id, body);
  }

  @Delete('logout')
  async logout(@Response({ passthrough: true }) res: ExpressResponse) {
    await this.authService.logout(res);
    return { message: 'User logged out successfully' };
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN])
  async deleteUserById(@Param('id') id: number) {
    await this.usersService.deleteUserById(id);
    return { message: 'User deleted successfully' };
  }
}
