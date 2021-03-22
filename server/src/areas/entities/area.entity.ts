import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// Area ties to users with ManyToOne, users tie to area with OneToMany

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.areas)
  user: User;

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, user: User, isActive: boolean) {
    this.id = id;
    this.user = user;
    this.isActive = isActive;
  }
}