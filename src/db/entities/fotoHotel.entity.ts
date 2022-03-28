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
import { TipoCarousel } from './tipoCarousel.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class FotoHotel {
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

  @ManyToOne(
    () => TipoCarousel,
    (tipoCarousel: TipoCarousel) => tipoCarousel.id,
    {
      nullable: false,
    },
  )
  tipoCarousel: TipoCarousel;

  @ManyToOne(() => Hotel, {
    nullable: false,
    primary: true,
  })
  hotel: Hotel;
}
