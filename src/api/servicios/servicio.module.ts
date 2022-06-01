import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Servicio } from '../../db/entities/servicio.entity';
import { Hotel } from '../../db/entities/hotel.entity';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';
import { HotelModule } from '../hoteles/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Hotel]), HotelModule],
  controllers: [ServicioController],
  providers: [ServicioService],
  exports: [ServicioService],
})
export class ServicioModule {}
