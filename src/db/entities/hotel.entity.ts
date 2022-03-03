import { Usuario } from './usuario.entity';
import { Mensaje } from './mensaje.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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
  latLng: number[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Mensaje, (mensaje: Mensaje) => mensaje.id)
  public mensajes: Mensaje[];

  @OneToMany(() => Usuario, (usuario: Usuario) => usuario.id)
  public usuarios: Usuario[];
}
