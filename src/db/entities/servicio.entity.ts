import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  AfterRemove,
} from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

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
    {
      onDelete: 'RESTRICT',
    },
  )
  @JoinTable({ name: 'servicio_x_habitacion' })
  habitaciones: Habitacion[];

  @AfterRemove()
  unlinkIcono() {
    fs.unlink(
      join(__dirname, '..', '..', '..', 'public', this.icon_path),
      (err) => {
        if (err) console.log(err);
      },
    );
  }
}
