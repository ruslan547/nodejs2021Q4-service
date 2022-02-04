import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { CustomLogger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT || 4000);
}
bootstrap();
