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
import { Timetable } from '../src/timetable/entities/timetable.entity';
import { Sensor } from '../src/sensors/entities/sensor.entity';
import { Controller } from '../src/controllers/entities/controller.entity';
import { Area } from '../src/areas/entities/area.entity';
import { User } from '../src/users/entities/user.entity';
import { SensorReading } from '../src/sensors/entities/sensor-reading.entity';
//


// Initializes test server & database
async function initializeTestApp () {
  return new Promise<INestApplication> (async (resolve) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(
          {useFactory: async () => Object.assign(await getConnectionOptions('test'), {
            entities: [CronAction, Controller, Area, User, Sensor, Timetable, SensorReading]})}),
        AppModule
      ]}).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    app.enableShutdownHooks();
    resolve(app);
  });
}

async function initalizeTestDb (app: INestApplication) {
  return new Promise<Connection> (async (resolve) => {
    const connection = app.get(Connection);
    await connection.synchronize(true);

    function createSeeds (tableName: string, mockData: any[]) {
      return connection.createQueryBuilder().insert().into(tableName).values(mockData).execute();
    }

    await createSeeds('user', mockSeeds.mockUserSeed);
    await createSeeds('area', mockSeeds.mockAreaSeed);

    // sensor & controller
    const mockControllers = await connection.getRepository(Controller).create(mockSeeds.mockControllerSeed);
    await connection.getRepository(Controller).save(mockControllers);

    const mockSensors = await connection.getRepository(Sensor).create(mockSeeds.mockSensorSeed);
    await connection.getRepository(Sensor).save(mockSensors);

    // await createSeeds('sensor', mockSeeds.mockSensorSeed);
    // await createSeeds('controller', mockSeeds.mockControllerSeed);

    await createSeeds('cron_action', mockSeeds.mockCronSeed);
    resolve(connection);
  });
}

let app: INestApplication;

beforeAll(async (done) => {
  app = await initializeTestApp();
  done();
});

afterAll(async (done) => {
  await app.get(Connection).close();
  // await app.close(); ---> Creates an error, need to manually kill the process
  done();
});

describe('Users', () => {
  let connection: Connection;

  beforeAll(async (done) => {
    connection = await initalizeTestDb(app);
    done();
  });

  it('should get all users', async (done) => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.all);
    done();
  });

  it('should get a single user', async (done) => {
    const res = await request(app.getHttpServer()).get('/users/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.all.filter(user => user.id === 2)[0]);
    done();
  });

  it('should update a user', async (done) => {
    const firstName = 'Deletoff';
    const lastName = 'Updatiano';

    const res = await request(app.getHttpServer()).patch('/users/2').send({firstName, lastName, isActive: false});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.modified);
    done();
  });

  it('should delete a user', async (done) => {
    const deleteRes = await request(app.getHttpServer()).delete('/users/2');
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers.afterDelete);
    done();
  });

  it('should create a user', async (done) => {
    const firstName = 'Phoenix';
    const lastName = 'Resurrectsson';
    const createRes = await request(app.getHttpServer()).post('/users').send({firstName, lastName, isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/users/4');
    expect(res.body).toEqual(mockUsers.created);
    done();
  });
});

describe('Areas', () => {
  let connection: Connection;

  beforeAll(async (done) => {
    connection = await initalizeTestDb(app);
    done();
  });

  it('should get all areas', async (done) => {
    const res = await request(app.getHttpServer()).get('/areas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all);
    done();
  });

  it('should get a single area', async (done) => {
    const res = await request(app.getHttpServer()).get('/areas/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all.filter(area => area.id === 2)[0]);
    done();
  });

  it('should update an area', async (done) => {
    const res = await request(app.getHttpServer()).patch('/areas/3').send({isActive: false});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.modified);
    await request(app.getHttpServer()).patch('/areas/3').send({isActive: true}); // reset status
    done();
  });

  it('should delete an area', async (done) => {
    const deleteRes = await request(app.getHttpServer()).delete('/areas/2');
    expect(deleteRes.status).toBe(200);
    await request(app.getHttpServer()).delete('/areas/5'); // deletes the one created within tests


    const res = await request(app.getHttpServer()).get('/areas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAreas.all.filter(area => area.id !== 2));
    done();
  });

  it('should create an area', async (done) => {
    const createRes = await request(app.getHttpServer()).post('/areas').send({user: 3, isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/areas/5');
    expect(res.body).toEqual(mockAreas.created);
    done();
  });
});

describe('Controllers', () => {
  let connection: Connection;

  beforeAll(async (done) => {
    connection = await initalizeTestDb(app);
    done();
  });

  it('should get all controllers', async (done) => {
    const res = await request(app.getHttpServer()).get('/controllers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all);
    done();
  });

  it('should get a single controller', async (done) => {
    const res = await request(app.getHttpServer()).get('/controllers/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all.filter(controller => controller.id === 2)[0]);
    done();
  });

  it('should update a controller', async (done) => {
    const res = await request(app.getHttpServer()).patch('/controllers/3').send({type: 'NowLatersDoor'});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.modifiedFirstLevel);

    await request(app.getHttpServer()).patch('/controllers/3').send({area: 4});
    const resAreaChange = await request(app.getHttpServer()).get('/controllers/3');
    expect(resAreaChange.body).toEqual(mockControllers.modifiedSecondLevel);
    done();
  });

  it('should delete a controller', async (done) => {
    const deleteRes = await request(app.getHttpServer()).delete('/controllers/3');
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/controllers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockControllers.all.filter(controller => controller.id !== 3));
    done();
  });

  it('should create a controller', async (done) => {
    const createRes = await request(app.getHttpServer()).post('/controllers').send({area: 2, type: 'TestiesNewDoor', isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/controllers/7');
    expect(res.body).toEqual(mockControllers.created);
    done();
  });
});

describe('Sensors', () => {
  let connection: Connection;

  beforeAll(async (done) => {
    connection = await initalizeTestDb(app);
    done();
  });

  it('should get all sensors', async (done) => {
    const res = await request(app.getHttpServer()).get('/sensors');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSensors.all);
    done();
  });

  it('should get a single sensor', async (done) => {
    const res = await request(app.getHttpServer()).get('/sensors/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSensors.all.filter(sensor => sensor.id === 2)[0]);
    done();
  });

  it('should update a sensor', async (done) => {
    const res = await request(app.getHttpServer()).patch('/sensors/3').send({type: 'NowLatersSensor'});
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSensors.modifiedFirstLevel);

    await request(app.getHttpServer()).patch('/sensors/3').send({area: 4});
    const resAreaChange = await request(app.getHttpServer()).get('/sensors/3');
    expect(resAreaChange.body).toEqual(mockSensors.modifiedSecondLevel);
    done();
  });

  it('should delete a sensor', async (done) => {
    const deleteRes = await request(app.getHttpServer()).delete('/sensors/3');
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/sensors');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSensors.all.filter(sensor => sensor.id !== 3));
    done();
  });

  it('should create a sensor', async (done) => {
    const createRes = await request(app.getHttpServer()).post('/sensors').send({area: 2, type: 'TestiesNewSensor', isActive: true});
    expect(createRes.status).toBe(201);

    const res = await request(app.getHttpServer()).get('/sensors/7');
    expect(res.body).toEqual(mockSensors.created);
    done();
  });
});

describe('Cron Jobs', () => {
  //TODO: Mock cron job's internal dependencies

  let connection: Connection;
  let allCrons: CronAction[];
  let singleCronId: string;
  let mockUpdatedCron: CronAction;

  beforeAll(async (done) => {
    connection = await initalizeTestDb(app);
    allCrons = await connection.getRepository(CronAction).find();
    singleCronId = allCrons[0].id;

    mockUpdatedCron = Object.assign({}, allCrons[0]);
    mockUpdatedCron.time = '7 * * * * *';
    mockUpdatedCron.action = JSON.stringify({id: 'pump1', action: 'on', duration:'2'});
    done();
  });

  it('should get all cron jobs', async (done) => {
    const res = await request(app.getHttpServer()).get('/crons');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(allCrons);
    done();
  });

  it('should get a single cron', async (done) => {
    const res = await request(app.getHttpServer()).get('/crons/' + singleCronId);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(allCrons[0]);
    done();
  });

  it('should update a cron job in db', async (done) => {
    const res = await request(app.getHttpServer()).patch('/crons/' + singleCronId)
      .send({
        time: '7 * * * * *',
        action: {id: 'pump1', action: 'on', duration:'2'}
      });

    expect(res.status).toBe(200);

    const updatedCron = await request(app.getHttpServer()).get('/crons/' + singleCronId);
    expect(updatedCron.body).toEqual(mockUpdatedCron);
    done();
  });

  it('should delete a cron job from db', async (done) => {
    const deleteRes = await request(app.getHttpServer()).delete('/crons/' + singleCronId);
    expect(deleteRes.status).toBe(200);

    const res = await request(app.getHttpServer()).get('/crons');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(allCrons.filter(cron => cron.id !== singleCronId));
    done();
  });

  it('should create a cron job', async (done) => {
    const newCronReq = {
      isActive: true,
      controller: 2,
      time: '9 * * * * *',
      action: {id: 'pump2', action: 'on', duration: '2'}
    };

    const createRes = await request(app.getHttpServer()).post('/crons').send(newCronReq);
    expect(createRes.status).toBe(201);

    const { id } = createRes.body.identifiers[0];
    const res = await request(app.getHttpServer()).get('/crons/' + id);
    expect(res.body).toEqual({
      id,
      isActive: true,
      time: '9 * * * * *',
      action: JSON.stringify(newCronReq.action)
    });
    done();
  });
});