import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  getServer(@Res() res: Response) {
    res.sendFile('index.html', {
      root: 'public',
    });
  }
}
