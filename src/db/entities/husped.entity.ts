import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Reserva_x_Huesped } from './reserva_x_husped.entity';

@Entity({ orderBy: { id: 'ASC' } })
export class Huesped {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  dni: number;

  @Column({ nullable: false })
  fecha_nacimiento: Date;

  @Column({ nullable: false })
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

  @OneToMany(
    () => Reserva_x_Huesped,
    (reserva_x_huesped: Reserva_x_Huesped) => reserva_x_huesped.huesped,
  )
  reserva_x_huesped: Reserva_x_Huesped[];
}
