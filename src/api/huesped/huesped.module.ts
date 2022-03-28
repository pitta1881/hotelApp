import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from './../../db/entities/reserva.entity';
import { Huesped } from './../../db/entities/husped.entity';
import { HuespedController } from './huesped.controller';
import { HuespedService } from './huesped.service';
import { ReservaModule } from '../reservas/reserva.module';
import { Reserva_x_Huesped } from './../../db/entities/reserva_x_husped.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Huesped, Reserva, Reserva_x_Huesped]),
    ReservaModule,
  ],
  controllers: [HuespedController],
  providers: [HuespedService],
})
export class HuespedModule {}
