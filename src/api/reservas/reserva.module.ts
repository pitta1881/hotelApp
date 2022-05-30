import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from '../../db/entities/reserva.entity';
import { HabitacionModule } from '../habitaciones/habitacion.module';
import { Habitacion } from '../../db/entities/habitacion.entity';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { HotelModule } from './../hoteles/hotel.module';
import { Huesped } from './../../db/entities/husped.entity';
import { HuespedModule } from './../huesped/huesped.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Habitacion, Huesped]),
    HotelModule,
    HabitacionModule,
    HuespedModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
