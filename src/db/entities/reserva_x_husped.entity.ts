import { Entity, CreateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Huesped } from './husped.entity';
import { Reserva } from './reserva.entity';

@Entity()
export class Reserva_x_Huesped {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ManyToOne(() => Reserva, (reserva: Reserva) => reserva.reserva_x_huesped, {
    primary: true,
  })
  reserva: Reserva;

  @ManyToOne(() => Huesped, (huesped: Huesped) => huesped.reserva_x_huesped, {
    primary: true,
  })
  huesped: Huesped;
}
