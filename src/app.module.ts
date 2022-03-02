import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FotosModule } from './api/fotos/fotos.module';
import { HabitacionesModule } from './api/habitaciones/habitaciones.module';
import { HotelesModule } from './api/hoteles/hoteles.module';
import { MensajesModule } from './api/mensajes/mensajes.module';
import { PaypertopModule } from './api/paypertop/paypertop.module';
import { PersonasModule } from './api/personas/personas.module';
import { ReservasModule } from './api/reservas/reservas.module';
import { ServiciosModule } from './api/servicios/servicios.module';
import { UsuariosModule } from './api/usuarios/usuarios.module';
import { AuthModule } from './api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    FotosModule,
    HabitacionesModule,
    HotelesModule,
    MensajesModule,
    PaypertopModule,
    PersonasModule,
    ReservasModule,
    ServiciosModule,
    UsuariosModule,
    ServiciosModule,
    AuthModule,
  ],
  controllers: [AppController],
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
