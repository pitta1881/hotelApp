import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitacionesService } from './habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';
import { TipoHabitacion } from './../../db/entities/tipoHabitacion.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelesModule } from '../hoteles/hoteles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habitacion, TipoHabitacion, Hotel]),
    HotelesModule,
  ],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
  exports: [HabitacionesService],
})
export class HabitacionesModule {}
