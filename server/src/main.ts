import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const port = process.env.HTTP_PORT || 3001;
  const host = process.env.HTTP_SERVER || 'localhost';

  await app.listen(port, host);
}
bootstrap();
