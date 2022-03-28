import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { Habitacion } from './habitacion.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class FotoHabitacion {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: false, unique: true })
  path: string;

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

  @ManyToOne(() => Habitacion, { primary: true })
  @JoinColumn([
    { name: 'habitacionId', referencedColumnName: 'id' },
    { name: 'hotelId', referencedColumnName: 'hotel' },
  ])
  habitacion: Habitacion;
}
