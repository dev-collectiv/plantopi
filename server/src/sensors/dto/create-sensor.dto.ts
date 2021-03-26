export class CreateSensorDto {
  areaId: string;
  type: string;
  isActive: boolean;

  constructor (areaId: string, type: string, isActive: boolean) {
    this.areaId = areaId;
    this.type = type;
    this.isActive = isActive;
  }
}
