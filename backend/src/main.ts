import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
