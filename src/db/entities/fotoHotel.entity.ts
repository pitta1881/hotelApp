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

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: false })
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
    (tipoCarousel: TipoCarousel) => tipoCarousel.fotosHotel,
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
