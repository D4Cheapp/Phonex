import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { WarehouseProductService } from './warehouse-product.service';

@ApiTags('Warehouse product')
@Controller('warehouse-product')
export class WarehouseProductController {
  constructor(private readonly warehouseService: WarehouseProductService) {}

  @Get()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @ApiQuery({ name: 'shop_id', required: false, type: Number })
  @ApiQuery({ name: 'product_id', required: false, type: Number })
  async getAllWarehouseProducts(
    @Query('shop_id') shopId?: number,
    @Query('product_id') productId?: number
  ) {
    return await this.warehouseService.getAllWarehouseProducts({ shopId, productId });
  }

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
