import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { Hotel } from '../../db/entities/hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelSubscriber } from './hotel.subscriber';
import { UsuarioModule } from '../usuarios/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), forwardRef(() => UsuarioModule)],
  controllers: [HotelController],
  providers: [HotelService, HotelSubscriber],
  exports: [HotelService],
})
export class HotelModule {}
