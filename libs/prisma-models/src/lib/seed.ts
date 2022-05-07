import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const test = await prisma.user.upsert({
    where: { email: 'test@plantopi.io' },
    update: {},
    create: {
      email: 'test@plantopi.io',
      name: 'Robert Plantopi',
    },
  });

  const zone = await prisma.zone.upsert({
    where: { name: 'kitchen' },
    update: {},
    create: {
      name: 'kitchen',
      userId: test.id,
    },
  });

  const controller = await prisma.controller.upsert({
    where: { name: 'main' },
    update: {},
    create: {
      name: 'main',
      zoneId: zone.id,
    },
  });

  const pump = await prisma.switch.upsert({
    where: { name: 'water_pump' },
    update: {},
    create: {
      name: 'water_pump',
      controllerId: controller.id,
      type: 'WATER_PUMP',
      cron: '*/5 * * * *',
    },
  });

  await prisma.pin.upsert({
    where: { pin: 22 },
    update: {},
    create: {
      pin: 22,
      controllerId: controller.id,
      pinType: 'DIGITAL_OUTPUT',
      switchId: pump.id,
    },
  });

  const tempSensor = await prisma.sensor.upsert({
    where: { name: 'temp_sensor' },
    update: {},
    create: {
      name: 'temp_sensor',
      controllerId: controller.id,
      type: 'TEMPERATURE',
    },
  });

  await prisma.pin.upsert({
    where: { pin: 23 },
    update: {},
    create: {
      pin: 23,
      controllerId: controller.id,
      pinType: 'ANALOG_INPUT',
      sensorId: tempSensor.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
