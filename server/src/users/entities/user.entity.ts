import { Area } from 'src/areas/entities/area.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Area, area => area.user)
  areas: Area[]

  constructor(id: number, firstName: string, lastName: string, areas: Area[], isActive: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.areas = areas;
    this.isActive = isActive;
  }
}