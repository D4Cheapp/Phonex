import { Controller, Get, HttpException, HttpStatus, Param, Response } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';
import fs from 'fs';
import path from 'path';

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
