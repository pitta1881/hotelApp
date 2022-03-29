import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppService } from './app.service';

import { TypeOrmConfigService } from './db/typeorm-config.service';
import { FotoModule } from './api/fotos/foto.module';
import { HabitacionModule } from './api/habitaciones/habitacion.module';
import { HotelModule } from './api/hoteles/hotel.module';
import { MensajeModule } from './api/mensajes/mensaje.module';
import { PaypertopModule } from './api/paypertop/paypertop.module';
import { HuespedModule } from './api/huesped/huesped.module';
import { ReservaModule } from './api/reservas/reserva.module';
import { ServicioModule } from './api/servicios/servicio.module';
import { UsuarioModule } from './api/usuarios/usuario.module';
import { AuthModule } from './api/auth/auth.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { WebModule } from './web/web.module';

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
    WebModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
