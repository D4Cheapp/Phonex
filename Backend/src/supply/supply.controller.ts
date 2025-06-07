import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { ChangeSupplyStatusDto, SupplyDto } from './supply.dto';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Get()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @ApiQuery({ name: 'shop_id', required: false })
  @ApiQuery({ name: 'supplier_id', required: false })
  @ApiQuery({ name: 'supply_status_id', required: false })
  async getAllSupply(
    @Query('shop_id') shopId: number,
    @Query('supplier_id') supplierId: number,
    @Query('supply_status_id') supplyStatusId: number
  ) {
    return await this.supplyService.getAllSupplies({ shopId, supplierId, supplyStatusId });
  }

  @Get(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async getSupplyById(@Param('id') id: number) {
    return await this.supplyService.getSupplyById(id);
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async createSupply(@Body() supply: SupplyDto) {
    return await this.supplyService.createSupply(supply);
  }

  @Patch()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async changeSupplyStatus(@Body() body: ChangeSupplyStatusDto) {
    return await this.supplyService.changeSupplyStatus(body.supply_id, body.supply_status_id);
  }
}
