import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { Servicio } from './servicio.entity';
import { TipoHabitacion } from './tipoHabitacion.entity';

@Entity()
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false, type: 'text' })
  descripcion_hab: string;

  @Column({ nullable: false, type: 'text' })
  descripcion_camas: string;

  @Column({ nullable: false })
  max_pax: number;

  @Column({ nullable: false })
  tamanio_m2: number;

  @Column({ nullable: false, default: false, type: 'boolean' })
  ocupado: boolean;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.id, {
    nullable: false,
  })
  hotel: Hotel;

  @ManyToOne(
    () => TipoHabitacion,
    (tipoHabitacion: TipoHabitacion) => tipoHabitacion.id,
    {
      nullable: false,
    },
  )
  tipoHabitacion: TipoHabitacion;

  @ManyToMany(() => Servicio, (servicio: Servicio) => servicio.habitaciones)
  servicios: Servicio[];
}
