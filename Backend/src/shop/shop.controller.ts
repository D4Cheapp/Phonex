import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { ShopDto } from './shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'address', required: false, type: String })
  async getAllShops(@Query('name') name?: string, @Query('address') address?: string) {
    return await this.shopService.getAllShops({ name, address });
  }

  @Post()
  @RolesD([RolesE.ADMIN])
  async createShop(@Body() shopDto: ShopDto) {
    return await this.shopService.createShop(shopDto);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN])
  async updateShop(@Body() shopDto: ShopDto, @Param('id') id: number) {
    return await this.shopService.updateShop(id, shopDto);
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN])
  async deleteShop(@Param('id') id: number) {
    await this.shopService.deleteShop(id);
    return { message: 'Shop deleted successfully' };
  }
}
