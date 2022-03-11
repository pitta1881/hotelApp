import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Hotel } from './hotel.entity';

@Entity()
export class Mensaje {
  @PrimaryGeneratedColumn()
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
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.id, {
    nullable: false,
  })
  hotel: Hotel;
}
