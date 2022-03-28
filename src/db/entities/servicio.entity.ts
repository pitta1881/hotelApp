import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { Habitacion } from './habitacion.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class Servicio {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @Column({ nullable: false, default: false })
  servInstal: boolean;

  @Column({ nullable: false })
  icon_path: string;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.servicios, {
    nullable: true,
    primary: true,
  })
  hotel: Hotel;

  @ManyToMany(
    () => Habitacion,
    (habitacion: Habitacion) => habitacion.servicios,
  )
  @JoinTable({ name: 'servicio_x_habitacion' })
  habitaciones: Habitacion[];
}
