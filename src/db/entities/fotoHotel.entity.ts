import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { TipoCarousel } from './tipoCarousel.entity';

@Entity()
export class FotoHotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: false, unique: true })
  path: string;

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

  @ManyToOne(
    () => TipoCarousel,
    (tipoCarousel: TipoCarousel) => tipoCarousel.id,
    {
      nullable: false,
    },
  )
  tipoCarousel: TipoCarousel;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.id, {
    nullable: false,
  })
  hotel: Hotel;
}
