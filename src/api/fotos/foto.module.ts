import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hotel } from '../../db/entities/hotel.entity';
import { FotoHotel } from '../../db/entities/fotoHotel.entity';
import { TipoCarousel } from '../../db/entities/tipoCarousel.entity';
import { HotelModule } from '../hoteles/hotel.module';
import { FotoController } from './foto.controller';
import { FotoService } from './foto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FotoHotel, Hotel, TipoCarousel]),
    HotelModule,
  ],
  controllers: [FotoController],
  providers: [FotoService],
})
export class FotoModule {}
