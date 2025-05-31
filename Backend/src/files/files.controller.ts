import { Controller, Get, HttpException, HttpStatus, Param, Response } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { Response as ExpressResponse } from 'express';
import fs from 'fs';
import path from 'path';

@ApiExcludeController()
@Controller('files')
export class FilesController {
  @Get(':filename')
  getFile(@Param('filename') filename: string, @Response() res: ExpressResponse) {
    const filePath = path.join(__dirname, '../uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    return res.sendFile(filePath);
  }
}
