import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MensajesController } from './mensajes.controller';
import { MensajesService } from './mensajes.service';
import { Mensaje } from '../../db/entities/mensaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensaje])],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}
