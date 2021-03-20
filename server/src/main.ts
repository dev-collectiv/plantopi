import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const port = 3001;
  const host = 'localhost';

  await app.listen(port, host);
}
bootstrap();
