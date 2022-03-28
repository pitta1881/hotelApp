import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { Hotel } from '../../db/entities/hotel.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../db/entities/usuario.entity';
import { HotelModule } from '../hoteles/hotel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Hotel]),
    forwardRef(() => HotelModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
