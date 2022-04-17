import { Habitacion } from './habitacion.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

import { Paypertop } from './paypertop.entity';
import { Usuario } from './usuario.entity';
import { Mensaje } from './mensaje.entity';
import { Servicio } from './servicio.entity';
import { FotoHotel } from './fotoHotel.entity';
import { Exclude } from 'class-transformer';

@Entity({ orderBy: { id: 'ASC' } })
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: false, type: 'boolean' })
  activo: boolean;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @Column({ nullable: false, unique: true })
  nombre_uri: string;

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

  @Column({ nullable: true })
  logo_path: string;

  @Column({ nullable: true })
  horario_contacto: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  instagram: string;

  @Exclude()
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

  @OneToMany(() => Mensaje, (mensaje: Mensaje) => mensaje.hotel)
  mensajes: Mensaje[];

  @OneToMany(() => Usuario, (usuario: Usuario) => usuario.hotel)
  usuarios: Usuario[];

  @OneToMany(() => Paypertop, (paypertop: Paypertop) => paypertop.hotel)
  paypertops: Paypertop[];

  @OneToMany(() => Servicio, (servicio: Servicio) => servicio.hotel)
  servicios: Servicio[];

  @OneToMany(() => FotoHotel, (fotoHotel: FotoHotel) => fotoHotel.hotel)
  fotos: FotoHotel[];

  @OneToMany(() => Habitacion, (habitacion: Habitacion) => habitacion.hotel)
  habitaciones: Habitacion[];

  @BeforeInsert()
  async nombreUriTransform() {
    this.nombre_uri = this.nombre.toLowerCase().replace(/\s+/g, '');
  }
}
