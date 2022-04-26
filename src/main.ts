import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT;
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
