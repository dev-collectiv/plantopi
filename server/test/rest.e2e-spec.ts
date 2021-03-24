import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection, getConnectionOptions } from 'typeorm';
import * as mocks from './rest.e2e-mocks';

// DB ENTITIES
import { CronAction } from '../src/cron-action/entities/cron-action.entity';
import { Sensor } from '../src/sensors/entities/sensor.entity';
import { Controller } from '../src/controllers/entities/controller.entity';
import { Area } from '../src/areas/entities/area.entity';
import { User } from '../src/users/entities/user.entity';
//

let app: INestApplication;
let connection: Connection;

// Initializes test server & database
beforeAll(async () => {

  // SERVER INITIALIZATION
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync(
        {useFactory: async () => Object.assign(await getConnectionOptions('test'), {
          entities: [CronAction, Controller, Area, User, Sensor]})}),
      AppModule
    ]}).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  // DB INITIALIZATION
  connection = app.get(Connection);
  await connection.synchronize(true);

  function createSeeds (tableName: string, mockData: any[]) {
    return connection.createQueryBuilder().insert().into(tableName).values(mockData).execute();
  }

  await createSeeds('user', mocks.mockUserSeed);
  await createSeeds('area', mocks.mockAreaSeed);
  await createSeeds('sensor', mocks.mockSensorSeed);
  await createSeeds('controller', mocks.mockControllerSeed);
});

describe('Users', () => {
  it('should get all users', async () => {
    // const res = await request(app.getHttpServer()).get('/users');
    // expect(res.status).toBe(200);
    // expect(res.body).toEqual(mocks.mockUsers);
  });
});
