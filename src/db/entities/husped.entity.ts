import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Reserva } from './reserva.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class Huesped {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  dni: number;

  @Column({ nullable: false })
  fecha_nacimiento: Date;

  @Column({ nullable: true })
  telefono: string;

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

  @ManyToMany(() => Reserva, (reserva: Reserva) => reserva.huespedes, {
    onDelete: 'RESTRICT',
  })
  @JoinTable({ name: 'huesped_x_reserva' })
  reservas: Reserva[];
}
