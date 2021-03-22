export class CreateUserDto {
  firstName: string;
  lastName: string;
  isActive: boolean;

  constructor (firstName: string, lastName: string, isActive: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}
