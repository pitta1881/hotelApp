import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/db/entities/hotel.entity';

import { FotoHotel } from '../../db/entities/fotoHotel.entity';
import { TipoCarousel } from '../../db/entities/tipoCarousel.entity';
import { HotelesModule } from '../hoteles/hoteles.module';
import { FotosController } from './fotos.controller';
import { FotosService } from './fotos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FotoHotel, Hotel, TipoCarousel]),
    HotelesModule,
  ],
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule {}
