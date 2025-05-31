import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { ProductSupplierDto } from './product-supplier.dto';
import { ProductSupplierService } from './product-supplier.service';

@ApiTags('Product supplier')
@Controller('product-supplier')
export class ProductSupplierController {
  constructor(private readonly productSupplierService: ProductSupplierService) {}

  @Get()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @ApiQuery({ name: 'shopId', required: false, type: Number })
  @ApiQuery({ name: 'productId', required: false, type: Number })
  async getAllProductSuppliers(
    @Query('shopId') shopId?: number,
    @Query('productId') productId?: number
  ) {
    return await this.productSupplierService.getAllProductSuppliers(shopId, productId);
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async createProductSupplier(@Body() body: ProductSupplierDto) {
    return await this.productSupplierService.createProductSupplier(body);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async updateProductSupplier(@Param('id') id: number, @Body() body: ProductSupplierDto) {
    return await this.productSupplierService.updateProductSupplier(id, body);
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async deleteProductSupplier(@Param('id') id: number) {
    await this.productSupplierService.deleteProductSupplier(id);
    return { message: 'Product supplier deleted successfully' };
  }
}
