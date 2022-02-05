import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  getServer(): string {
    return 'server is working...';
  }
}
