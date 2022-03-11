import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hotel } from './../../db/entities/hotel.entity';
import { MensajesController } from './mensajes.controller';
import { MensajesService } from './mensajes.service';
import { Mensaje } from '../../db/entities/mensaje.entity';
import { HotelesModule } from '../hoteles/hoteles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mensaje, Hotel]), HotelesModule],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}
