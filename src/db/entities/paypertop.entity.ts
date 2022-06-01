import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { TipoPPT } from './tipoPPT.entity';

@Entity({ orderBy: { abono_mensual: 'DESC' } })
export class Paypertop {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  titular: string;

  @Column({ nullable: false })
  razon_social: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false, type: 'text' })
  descripcion: string;

  @Column({ nullable: true, type: 'text' })
  url: string;

  @Column({ nullable: false, type: 'float' })
  abono_mensual: number;

  @Column({ nullable: false, array: true, type: 'float' })
  lat_lng: number[];

  @Column({ nullable: false, default: false })
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

  @ManyToOne(() => Hotel, {
    nullable: false,
    primary: true,
  })
  hotel: Hotel;

  @ManyToOne(() => TipoPPT, (tipoPPT: TipoPPT) => tipoPPT.id, {
    nullable: false,
  })
  tipoPPT: TipoPPT;
}
