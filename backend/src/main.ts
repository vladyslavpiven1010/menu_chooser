import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://192.168.1.224:3001'],
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
