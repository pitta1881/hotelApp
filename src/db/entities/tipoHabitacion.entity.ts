import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Habitacion } from './habitacion.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class TipoHabitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @OneToMany(() => Habitacion, (habitacion: Habitacion) => habitacion.id, {
    nullable: true,
  })
  public habitaciones: Habitacion[];
}
