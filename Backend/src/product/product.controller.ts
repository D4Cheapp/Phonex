import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { RolesE } from 'src/constants/roles';
import { RolesD } from 'src/role/roles.decorator';

import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: Number })
  async getAllProducts(@Query('search') search?: string, @Query('category') category?: number) {
    return await this.productsService.getAllProducts({ search, category });
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.productsService.getProductById(id);
  }

  @Post()
  @ApiBearerAuth()
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.join(__dirname, '../uploads'),
        filename: (_, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  async createProduct(@Body() body: ProductDto, @UploadedFile() image: Express.Multer.File) {
    return await this.productsService.createProduct(body, image.path);
  }

  @Patch(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.join(__dirname, '../uploads'),
        filename: (_, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  async updateProductById(
    @Param('id') id: number,
    @Body() body: ProductDto,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return await this.productsService.updateProduct(id, body, image?.path);
  }

  @Delete(':id')
  @RolesD([RolesE.ADMIN, RolesE.MANAGER])
  async deleteProductById(@Param('id') id: number) {
    await this.productsService.deleteProductById(id);
    return { message: 'Product deleted successfully' };
  }
}
