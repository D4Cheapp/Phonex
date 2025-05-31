import { Controller, Delete, Get, Param } from '@nestjs/common';

import { Roles } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get(':id')
  @RolesD([Roles.ADMIN, Roles.MANAGER])
  async getShopWarehouse(@Param('id') id: number) {
    return await this.warehouseService.getShopWarehouse(id);
  }

  @Delete(':id')
  @RolesD([Roles.ADMIN, Roles.MANAGER])
  async deleteWarehouseProduct(@Param('id') id: number) {
    await this.warehouseService.deleteWarehouseProduct(id);
    return { message: 'Warehouse product deleted successfully' };
  }
}
