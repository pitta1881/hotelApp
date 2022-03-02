import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  checkin: Date;

  @Column({ nullable: false })
  checkout: Date;

  @Column({ nullable: false })
  pais: string;

  @Column({ nullable: false })
  adultos: number;

  @Column({ nullable: false, default: 0 })
  menores: number;

  @Column({ nullable: false, type: 'text' })
  mensaje: string;

  @Column({ default: false })
  leido: boolean;

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
}
