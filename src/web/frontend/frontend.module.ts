import { Module } from '@nestjs/common';

import { HotelModule } from '../../api/hoteles/hotel.module';
import { HomeController } from './home.controller';
import { LandingController } from './landing.controller';
import { HabitacionesController } from './habitaciones.controller';
import { ContactoController } from './contacto.controller';
import { UbicacionController } from './ubicacion.controller';
import { ServiciosController } from './servicios.controller';

@Module({
  imports: [HotelModule],
  controllers: [
    HomeController,
    LandingController,
    HabitacionesController,
    ContactoController,
    UbicacionController,
    ServiciosController,
  ],
})
export class FrontendModule {}
