import { Module } from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';

@Module({
  providers: [HabitacionesService],
  controllers: [HabitacionesController]
})
export class HabitacionesModule {}
