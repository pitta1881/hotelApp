import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Servicio } from './../../db/entities/servicio.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelesModule } from '../hoteles/hoteles.module';
import { HabitacionesModule } from '../habitaciones/habitaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio, Hotel, Habitacion]),
    HotelesModule,
    HabitacionesModule,
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}
