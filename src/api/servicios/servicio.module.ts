import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Servicio } from '../../db/entities/servicio.entity';
import { Hotel } from '../../db/entities/hotel.entity';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';
import { Habitacion } from '../../db/entities/habitacion.entity';
import { HotelModule } from '../hoteles/hotel.module';
import { HabitacionModule } from '../habitaciones/habitacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio, Hotel, Habitacion]),
    HotelModule,
    HabitacionModule,
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
