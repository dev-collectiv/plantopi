-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMPERATURE', 'HUMIDITY', 'LIGHT', 'WATER_LEVEL', 'WATER_PH');

-- CreateEnum
CREATE TYPE "SwitchType" AS ENUM ('FAN', 'LIGHT', 'HEATER', 'COOLER', 'WATER_PUMP', 'HUMIDIFIER');

-- CreateEnum
CREATE TYPE "ControllerType" AS ENUM ('ESP8266', 'ESP32');

-- CreateEnum
CREATE TYPE "PinType" AS ENUM ('DIGITAL_OUTPUT', 'DIGITAL_INPUT', 'ANALOG_OUTPUT', 'ANALOG_INPUT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "zoneSettingsId" INTEGER NOT NULL,
    "zoneId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Controller" (
    "id" SERIAL NOT NULL,
    "zoneId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ControllerType" NOT NULL DEFAULT E'ESP32',

    CONSTRAINT "Controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControllerSettings" (
    "id" SERIAL NOT NULL,
    "controllerId" INTEGER NOT NULL,
    "pins" TEXT NOT NULL,
    "type" "ControllerType" NOT NULL,

    CONSTRAINT "ControllerSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "pin" INTEGER NOT NULL,
    "pinType" "PinType" NOT NULL DEFAULT E'DIGITAL_INPUT',
    "sensorId" INTEGER,
    "controllerId" INTEGER NOT NULL,
    "switchId" INTEGER,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "controllerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "type" "SensorType" NOT NULL,
    "pinId" INTEGER,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Switch" (
    "id" SERIAL NOT NULL,
    "controllerId" INTEGER NOT NULL,
    "cron" TEXT NOT NULL,
    "type" "SwitchType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "pinId" INTEGER,

    CONSTRAINT "Switch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "sensorId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_userId_key" ON "Zone"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_name_key" ON "Zone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_zoneSettingsId_key" ON "Zone"("zoneSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_zoneId_key" ON "Zone"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_zoneId_key" ON "Controller"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Controller_name_key" ON "Controller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ControllerSettings_controllerId_key" ON "ControllerSettings"("controllerId");

-- CreateIndex
CREATE UNIQUE INDEX "Pin_pin_key" ON "Pin"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "Pin_sensorId_key" ON "Pin"("sensorId");

-- CreateIndex
CREATE UNIQUE INDEX "Pin_switchId_key" ON "Pin"("switchId");

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_controllerId_key" ON "Sensor"("controllerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_pinId_key" ON "Sensor"("pinId");

-- CreateIndex
CREATE UNIQUE INDEX "Switch_controllerId_key" ON "Switch"("controllerId");

-- CreateIndex
CREATE UNIQUE INDEX "Switch_name_key" ON "Switch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Switch_pinId_key" ON "Switch"("pinId");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_sensorId_key" ON "Reading"("sensorId");

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controller" ADD CONSTRAINT "Controller_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_switchId_fkey" FOREIGN KEY ("switchId") REFERENCES "Switch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Switch" ADD CONSTRAINT "Switch_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "Controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
