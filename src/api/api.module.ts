import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { Connection } from 'typeorm';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TypeOrmConfigService } from '../db/typeorm-config.service';
import { FotoModule } from './fotos/foto.module';
import { HabitacionModule } from './habitaciones/habitacion.module';
import { HotelModule } from './hoteles/hotel.module';
import { MensajeModule } from './mensajes/mensaje.module';
import { PaypertopModule } from './paypertop/paypertop.module';
import { HuespedModule } from './huesped/huesped.module';
import { ReservaModule } from './reservas/reserva.module';
import { ServicioModule } from './servicios/servicio.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    FotoModule,
    HabitacionModule,
    HotelModule,
    MensajeModule,
    PaypertopModule,
    HuespedModule,
    ReservaModule,
    ServicioModule,
    UsuarioModule,
    ServicioModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApiModule {
  constructor(private connection: Connection) {}
}
