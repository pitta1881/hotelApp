import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { TipoPPT } from './tipoPPT.entity';

@Entity()
export class Paypertop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titular: string;

  @Column({ nullable: false })
  razon_social: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, type: 'text' })
  descripcion: string;

  @Column({ nullable: false, type: 'text' })
  url: string;

  @Column({ nullable: false, type: 'float' })
  abono_mensual: number;

  @Column({ nullable: false, array: true, type: 'float' })
  lat_lng: number[];

  @Column({ nullable: false, default: false })
  activo: boolean;

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

  @ManyToOne(() => TipoPPT, (tipoPPT: TipoPPT) => tipoPPT.id, {
    nullable: false,
  })
  tipoPPT: TipoPPT;
}
