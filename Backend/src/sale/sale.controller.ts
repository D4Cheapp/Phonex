import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { SaleDto } from './sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get(':shopId')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER, RolesE.SELLER])
  async getShopSales(@Param('shopId') shopId: number) {
    return await this.saleService.getShopSales(shopId);
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER, RolesE.SELLER])
  async createSale(@Body() saleDto: SaleDto) {
    return await this.saleService.createSale(saleDto);
  }
}
