import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitacionService } from './habitacion.service';
import { HabitacionController } from './habitacion.controller';
import { TipoHabitacion } from '../../db/entities/tipoHabitacion.entity';
import { Hotel } from '../../db/entities/hotel.entity';
import { Habitacion } from '../../db/entities/habitacion.entity';
import { HotelModule } from '../hoteles/hotel.module';
import { FotoHabitacionService } from './foto-habitacion.service';
import { FotoHabitacionController } from './foto-habitacion.controller';
import { FotoHabitacion } from '../../db/entities/fotoHabitacion.entity';
import { Servicio } from './../../db/entities/servicio.entity';
import { ServicioModule } from './../servicios/servicio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Habitacion,
      TipoHabitacion,
      Hotel,
      FotoHabitacion,
      Servicio,
    ]),
    HotelModule,
    ServicioModule,
  ],
  controllers: [HabitacionController, FotoHabitacionController],
  providers: [HabitacionService, FotoHabitacionService],
  exports: [HabitacionService, FotoHabitacionService],
})
export class HabitacionModule {}
