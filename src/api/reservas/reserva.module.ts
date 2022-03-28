import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from '../../db/entities/reserva.entity';
import { HabitacionModule } from '../habitaciones/habitacion.module';
import { Habitacion } from '../../db/entities/habitacion.entity';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Habitacion]), HabitacionModule],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
