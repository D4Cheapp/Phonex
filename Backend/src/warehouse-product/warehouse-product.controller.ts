import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { WarehouseProductService } from './warehouse-product.service';

@ApiTags('Warehouse product')
@Controller('warehouse-product')
export class WarehouseProductController {
  constructor(private readonly warehouseService: WarehouseProductService) {}

  @Get(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async getShopWarehouse(@Param('id') id: number) {
    return await this.warehouseService.getShopWarehouse(id);
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async deleteWarehouseProduct(@Param('id') id: number) {
    await this.warehouseService.deleteWarehouseProduct(id);
    return { message: 'Warehouse product deleted successfully' };
  }
}
