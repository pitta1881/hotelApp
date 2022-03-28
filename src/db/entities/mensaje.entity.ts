import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class Mensaje {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  checkin: Date;

  @Column({ nullable: false })
  checkout: Date;

  @Column({ nullable: false })
  pais: string;

  @Column({ nullable: false })
  adultos: number;

  @Column({ nullable: false, default: 0 })
  menores: number;

  @Column({ nullable: false, type: 'text' })
  mensaje: string;

  @Column({ nullable: false, default: false })
  leido: boolean;

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

  @ManyToOne(() => Hotel, {
    nullable: false,
    primary: true,
  })
  hotel: Hotel;
}
