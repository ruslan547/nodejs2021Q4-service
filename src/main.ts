import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';
import path from 'path';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { CustomLogger } from './utils/logger';

async function bootstrap() {
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(PORT || 4000);
}
bootstrap();
