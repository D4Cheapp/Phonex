import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Roles } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { ShopDto } from './shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  async getAllShops() {
    return await this.shopService.getAllShops();
  }

  @Post()
  @RolesD([Roles.ADMIN])
  async createShop(@Body() shopDto: ShopDto) {
    return await this.shopService.createShop(shopDto);
  }

  @Patch(':id')
  @RolesD([Roles.ADMIN])
  async updateShop(@Body() shopDto: ShopDto, @Param('id') id: number) {
    return await this.shopService.updateShop(id, shopDto);
  }

  @Delete(':id')
  @RolesD([Roles.ADMIN])
  async deleteShop(@Param('id') id: number) {
    await this.shopService.deleteShop(id);
    return { message: 'Shop deleted successfully' };
  }
}
