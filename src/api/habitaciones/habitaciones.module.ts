import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitacionesService } from './habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';
import { TipoHabitacion } from './../../db/entities/tipoHabitacion.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelesModule } from '../hoteles/hoteles.module';
import { FotosHabitacionService } from './fotos-habitacion.service';
import { FotosHabitacionController } from './fotos-habitacion.controller';
import { FotoHabitacion } from 'src/db/entities/fotoHabitacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Habitacion,
      TipoHabitacion,
      Hotel,
      FotoHabitacion,
    ]),
    HotelesModule,
  ],
  controllers: [HabitacionesController, FotosHabitacionController],
  providers: [HabitacionesService, FotosHabitacionService],
  exports: [HabitacionesService, FotosHabitacionService],
})
export class HabitacionesModule {}
