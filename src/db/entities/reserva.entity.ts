import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { Huesped } from './husped.entity';
import { Habitacion } from './habitacion.entity';
@Entity({ orderBy: { id: 'ASC' } })
export class Reserva {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  checkin: Date;

  @Column({ nullable: false })
  checkout: Date;

  @Column({ nullable: false, type: 'float' })
  monto_final: number;

  @Column({ nullable: false, type: 'float', default: 0 })
  monto_pagado: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Habitacion, (habitacion: Habitacion) => habitacion.id, {
    nullable: false,
  })
  habitacion: Habitacion;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.id, {
    nullable: false,
  })
  @PrimaryColumn({ type: 'int', name: 'hotelId' })
  hotel: Hotel;

  @ManyToMany(() => Huesped, (huesped: Huesped) => huesped.reservas, {
    onDelete: 'CASCADE',
  })
  huespedes: Huesped[];
}
