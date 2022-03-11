import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Hotel } from './../../db/entities/hotel.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './../../db/entities/usuario.entity';
import { HotelesModule } from '../hoteles/hoteles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Hotel]), HotelesModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
