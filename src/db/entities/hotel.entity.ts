import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Paypertop } from './paypertop.entity';
import { Usuario } from './usuario.entity';
import { Mensaje } from './mensaje.entity';
import { Servicio } from './servicio.entity';
import { FotoHotel } from './fotoHotel.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false, type: 'text' })
  descripcion_home: string;

  @Column({ nullable: false, type: 'text' })
  descripcion_ubi: string;

  @Column({ nullable: false })
  telefono_1: string;

  @Column({ nullable: true })
  telefono_2: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: false, array: true, type: 'float' })
  lat_lng: number[];

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

  @OneToMany(() => Mensaje, (mensaje: Mensaje) => mensaje.id)
  mensajes: Mensaje[];

  @OneToMany(() => Usuario, (usuario: Usuario) => usuario.id)
  usuarios: Usuario[];

  @OneToMany(() => Paypertop, (paypertop: Paypertop) => paypertop.id)
  paypertops: Paypertop[];

  @OneToMany(() => Servicio, (servicio: Servicio) => servicio.id)
  servicios: Servicio[];

  @OneToMany(() => FotoHotel, (fotoHotel: FotoHotel) => fotoHotel.id)
  fotos: FotoHotel[];
}
