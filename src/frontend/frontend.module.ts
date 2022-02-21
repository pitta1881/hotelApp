import { Module } from '@nestjs/common';

import { ContactoModule } from './contacto/contacto.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { ServiciosModule } from './servicios/servicios.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    HomeModule,
    HabitacionesModule,
    ServiciosModule,
    UbicacionModule,
    ContactoModule,
  ],
})
export class FrontendModule {}
