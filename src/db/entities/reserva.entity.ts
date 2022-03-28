import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { Habitacion } from './habitacion.entity';
import { Reserva_x_Huesped } from './reserva_x_husped.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class Reserva {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @PrimaryColumn({ type: 'int' })
  habitacionId: number;

  @PrimaryColumn({ type: 'int' })
  hotelId: number;

  @Column({ nullable: false })
  checkin: Date;

  @Column({ nullable: false })
  checkout: Date;

  @Column({ nullable: false, type: 'float' })
  monto_final: number;

  @Column({ nullable: false, type: 'float' })
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

  @ManyToOne(() => Habitacion)
  @JoinColumn([
    { name: 'habitacionId', referencedColumnName: 'id' },
    { name: 'hotelId', referencedColumnName: 'hotel' },
  ])
  habitacion: Habitacion;

  @OneToMany(
    () => Reserva_x_Huesped,
    (reserva_x_huesped: Reserva_x_Huesped) => reserva_x_huesped.reserva,
  )
  reserva_x_huesped: Reserva_x_Huesped[];
}
