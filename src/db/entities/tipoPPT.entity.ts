import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Paypertop } from './paypertop.entity';

@Entity()
export class TipoPPT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @OneToMany(() => Paypertop, (paypertop: Paypertop) => paypertop.id)
  public paypertops: Paypertop[];
}
