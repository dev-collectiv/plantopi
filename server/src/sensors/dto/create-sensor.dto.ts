export class CreateSensorDto {
  areaId: string;
  isActive: boolean;

  constructor (areaId: string, isActive: boolean) {
    this.areaId = areaId;
    this.isActive = isActive;
  }
}
