import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { Servicio } from './servicio.entity';
import { TipoHabitacion } from './tipoHabitacion.entity';
import { FotoHabitacion } from './fotoHabitacion.entity';
import { Exclude } from 'class-transformer';

@Entity({ orderBy: { id: 'ASC' } })
export class Habitacion {
  @PrimaryColumn({ type: 'int' })
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
  activo: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.id, {
    nullable: false,
  })
  @PrimaryColumn({ type: 'int', name: 'hotelId' })
  hotel: Hotel;

  @ManyToOne(
    () => TipoHabitacion,
    (tipoHabitacion: TipoHabitacion) => tipoHabitacion.id,
    {
      nullable: false,
    },
  )
  tipoHabitacion: TipoHabitacion;

  @ManyToMany(() => Servicio, (servicio: Servicio) => servicio.habitaciones, {
    onDelete: 'CASCADE',
  })
  servicios: Servicio[];

  @OneToMany(
    () => FotoHabitacion,
    (fotoHabitacion: FotoHabitacion) => fotoHabitacion.habitacion,
  )
  fotos: FotoHabitacion[];
}
