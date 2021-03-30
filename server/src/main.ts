import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Connection } from 'typeorm';
import { demoUserSeed, demoAreaSeed, demoControllerSeed, demoSensorSeed } from './demo-dbSeeds';
import { Sensor } from './sensors/entities/sensor.entity';
import { Controller } from './controllers/entities/controller.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  function dbSeeds () {
    return new Promise (async res => {
      const connection = app.get(Connection);

      function createSeeds (tableName: string, seedData: any) {
        return connection.createQueryBuilder().insert().into(tableName).values(seedData).execute();
      }

      await createSeeds('user', demoUserSeed);
      await createSeeds('area', demoAreaSeed);
      const demoController = await connection.getRepository(Controller).create(demoControllerSeed);
      await connection.getRepository(Controller).save(demoController);

      const demoSensor = await connection.getRepository(Sensor).create(demoSensorSeed);
      await connection.getRepository(Sensor).save(demoSensor);
      res('');
    });
  }

  await dbSeeds();

  app.enableCors();
  const port = process.env.HTTP_PORT || 3001;
  const host = process.env.HTTP_SERVER || 'localhost';

  await app.listen(port, host);
}
bootstrap();

