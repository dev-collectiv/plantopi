import { Area } from 'src/areas/entities/area.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// Area ties to users with ManyToOne, users tie to area with OneToMany

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, area => area.sensors)
  area: Area;

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, area: Area, isActive: boolean) {
    this.id = id;
    this.area = area;
    this.isActive = isActive;
  }
}