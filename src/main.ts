import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT || 4000);
}
bootstrap();
