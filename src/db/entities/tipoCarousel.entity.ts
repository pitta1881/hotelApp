import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { FotoHotel } from './fotoHotel.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class TipoCarousel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @OneToMany(() => FotoHotel, (fotoHotel: FotoHotel) => fotoHotel.id)
  public fotosHotel: FotoHotel[];
}
