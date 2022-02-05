import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AuthGuard } from '../../guards/auth.guard';
import { FileService } from './file.service';

@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  // eslint-disable-next-line class-methods-use-this
  getFile(@Res() res: Response, @Param('filename') filename: string) {
    if (!this.fileService.getFiles().includes(filename)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const file = createReadStream(join(process.cwd(), 'public/img', filename));
    file.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/img',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  // eslint-disable-next-line class-methods-use-this
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileService.setFile(file.filename);
    return { filename: file.filename };
  }
}
