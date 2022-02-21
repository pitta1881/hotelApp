import { HabitacionesService } from './habitaciones.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Get()
  @Render('pages/frontend/habitaciones')
  getPage(): any {
    return { message: 'Estoy en Habitaciones' };
  }
}
