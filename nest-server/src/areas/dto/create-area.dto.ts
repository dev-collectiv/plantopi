export class CreateAreaDto {
  userId: string;
  isActive: boolean;

  constructor (userId: string, isActive: boolean) {
    this.userId = userId;
    this.isActive = isActive;
  }
}
