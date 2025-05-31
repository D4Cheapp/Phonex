import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { SupplyDto } from './supply.dto';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Get(':shopId')
  async getSupplyByShopId(@Param('shopId') shopId: number) {
    return await this.supplyService.getSupplyByShopId(shopId);
  }

  @Post()
  async createSupply(@Body() supply: SupplyDto) {
    return await this.supplyService.createSupply(supply);
  }

  @Patch(':id')
  async changeSupplyStatus(@Param('id') id: number, @Body() status: { supplyStatusId: number }) {
    return await this.supplyService.changeSupplyStatus(id, status.supplyStatusId);
  }
}
