import { Module } from '@nestjs/common';

import { GeneralModule } from './general/general.module';
import { FotosModule } from './fotos/fotos.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { ReservasModule } from './reservas/reservas.module';
import { PaypertopModule } from './paypertop/paypertop.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';

@Module({
  imports: [
    GeneralModule,
    FotosModule,
    HabitacionesModule,
    ReservasModule,
    PaypertopModule,
    MensajesModule,
    ConfiguracionModule,
  ],
})
export class BackendModule {}
