/*
  Warnings:

  - You are about to drop the column `zoneId` on the `Zone` table. All the data in the column will be lost.
  - You are about to drop the column `zoneSettingsId` on the `Zone` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Zone_zoneId_key";

-- DropIndex
DROP INDEX "Zone_zoneSettingsId_key";

-- AlterTable
ALTER TABLE "Zone" DROP COLUMN "zoneId",
DROP COLUMN "zoneSettingsId";
