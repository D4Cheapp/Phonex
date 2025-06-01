import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { SupplyDto } from './supply.dto';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Get(':shop_id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async getSupplyByShopId(@Param('shop_id') shopId: number) {
    return await this.supplyService.getSupplyByShopId(shopId);
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async createSupply(@Body() supply: SupplyDto) {
    return await this.supplyService.createSupply(supply);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async changeSupplyStatus(@Param('id') id: number, @Body() status: { supplyStatusId: number }) {
    return await this.supplyService.changeSupplyStatus(id, status.supplyStatusId);
  }
}
