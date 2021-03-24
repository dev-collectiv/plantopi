import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection, getConnectionOptions } from 'typeorm';
import * as mockSeeds from './mocks/rest.e2e-mockSeeds';
import { mockUsers } from './mocks/rest.e2e-mockUsers';
import { mockAreas } from './mocks/rest.e2e-mockAreas';
import { mockControllers } from './mocks/rest.e2e-mockControllers';
import { mockSensors } from './mocks/rest.e2e-mockSensors';


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

  await createSeeds('user', mockSeeds.mockUserSeed);
  await createSeeds('area', mockSeeds.mockAreaSeed);
  await createSeeds('sensor', mockSeeds.mockSensorSeed);
  await createSeeds('controller', mockSeeds.mockControllerSeed);
});

describe('Users', () => {
  it('should get all users', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.all);
  });

  it('should get a single user', async () => {
    const res = await request(app.getHttpServer()).get('/users/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.all.filter(user => user.id === 2)[0]);
  });

  it('should update a user', async () => {
    const firstName = 'Deletoff';
    const lastName = 'Updatiano';

    const res = await request(app.getHttpServer()).patch('/users/2').send({firstName, lastName, isActive: false});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.modified);
  });

  it('should delete a user', async () => {
    const deleteRes = await request(app.getHttpServer()).delete('/users/2');
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.afterDelete);
  });

  it('should create a user', async () => {
    const firstName = 'Phoenix';
    const lastName = 'Resurrectsson';
    const createRes = await request(app.getHttpServer()).post('/users').send({firstName, lastName, isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/users/4');
    expect(res.body).toEqual(mockUsers.created);
  });
});
