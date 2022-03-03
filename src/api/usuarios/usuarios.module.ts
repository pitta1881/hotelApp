import { Hotel } from 'src/db/entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './../../db/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Hotel])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
