import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { SupplierDto } from './supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  async getAllSuppliers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string
  ) {
    return await this.supplierService.getAllSuppliers({ name, email, phone });
  }

  @Post()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async createSupplier(@Body() supplierDto: SupplierDto) {
    return await this.supplierService.createSupplier(supplierDto);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async updateSupplier(@Param('id') id: number, @Body() supplierDto: SupplierDto) {
    return await this.supplierService.updateSupplier(id, supplierDto);
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async deleteSupplier(@Param('id') id: number) {
    await this.supplierService.deleteSupplier(id);
    return { message: 'Supplier deleted successfully' };
  }
}
