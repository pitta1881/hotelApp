import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hotel } from '../../db/entities/hotel.entity';
import { MensajeController } from './mensaje.controller';
import { MensajeService } from './mensaje.service';
import { Mensaje } from '../../db/entities/mensaje.entity';
import { HotelModule } from '../hoteles/hotel.module';
import { MailModule } from './../../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensaje, Hotel]),
    HotelModule,
    MailModule,
  ],
  controllers: [MensajeController],
  providers: [MensajeService],
})
export class MensajeModule {}
