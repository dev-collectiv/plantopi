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

describe('Areas', () => {
  it('should get all areas', async () => {
    const res = await request(app.getHttpServer()).get('/areas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all);
  });

  it('should get a single area', async () => {
    const res = await request(app.getHttpServer()).get('/areas/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all.filter(area => area.id === 2)[0]);
  });

  it('should update an area', async () => {
    const res = await request(app.getHttpServer()).patch('/areas/3').send({isActive: false});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.modified);
    await request(app.getHttpServer()).patch('/areas/3').send({isActive: true}); // reset status
  });

  it('should delete an area', async () => {
    const deleteRes = await request(app.getHttpServer()).delete('/areas/2');
    expect(deleteRes.status).toBe(200);
    await request(app.getHttpServer()).delete('/areas/5'); // deletes the one created within tests


    const res = await request(app.getHttpServer()).get('/areas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all.filter(area => area.id !== 2));
  });

  it('should create an area', async () => {
    const createRes = await request(app.getHttpServer()).post('/areas').send({user: 3, isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/areas/5');
    expect(res.body).toEqual(mockAreas.created);
  });
});

describe.only('Controllers', () => {
  it('should get all controllers', async () => {
    const res = await request(app.getHttpServer()).get('/controllers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all);
  });

  it('should get a single controller', async () => {
    const res = await request(app.getHttpServer()).get('/controllers/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all.filter(controller => controller.id === 2)[0]);
  });

  it('should update a controller', async () => {
    const res = await request(app.getHttpServer()).patch('/controllers/3').send({type: 'NowLatersDoor'});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.modifiedFirstLevel);

    await request(app.getHttpServer()).patch('/controllers/3').send({area: 4});
    const resAreaChange = await request(app.getHttpServer()).get('/controllers/3');
    expect(resAreaChange.body).toEqual(mockControllers.modifiedSecondLevel);
  });

  it('should delete a controller', async () => {
    const deleteRes = await request(app.getHttpServer()).delete('/controllers/3');
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/controllers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all.filter(controller => controller.id !== 3));
  });

  it('should create a controller', async () => {
    const createRes = await request(app.getHttpServer()).post('/controllers').send({area: 2, type: 'TestiesNewDoor', isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/controllers/7');
    expect(res.body).toEqual(mockControllers.created);
  });
});
