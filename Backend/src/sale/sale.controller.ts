import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { SaleDto } from './sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get(':shop_id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER, RolesE.CASHIER])
  async getShopSales(@Param('shop_id') shopId: number) {
    return await this.saleService.getShopSales(shopId);
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER, RolesE.CASHIER])
  async createSale(@Body() saleDto: SaleDto) {
    return await this.saleService.createSale(saleDto);
  }
}
