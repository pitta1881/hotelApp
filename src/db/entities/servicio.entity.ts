import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { Habitacion } from './habitacion.entity';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @Column({ nullable: false, default: false })
  servInstal: boolean;

  @Column({ nullable: false })
  icon_path: string;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.servicios, {
    nullable: true,
  })
  hotel: Hotel;

  @ManyToMany(
    () => Habitacion,
    (habitacion: Habitacion) => habitacion.servicios,
    {
      cascade: true,
    },
  )
  @JoinTable()
  habitaciones: Habitacion[];
}
