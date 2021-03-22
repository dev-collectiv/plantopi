import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, firstName: string, lastName: string, isActive: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}