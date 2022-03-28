import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  PrimaryColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Hotel } from './hotel.entity';
import { Exclude } from 'class-transformer';

@Entity({ orderBy: { id: 'ASC' } })
export class Usuario {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  nick: string;

  @Exclude()
  @Column({ nullable: false, type: 'text' })
  password: string;

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

  @ManyToOne(() => Hotel, {
    nullable: false,
    primary: true,
  })
  hotel: Hotel;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
