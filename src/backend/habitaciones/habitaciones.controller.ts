import { Controller, Get, Render, Redirect } from '@nestjs/common';

import { HabitacionesService } from './habitaciones.service';

@Controller('backend')
export class HabitacionesController {
  constructor(private readonly generalService: HabitacionesService) {}

  @Get('/habitaciones')
  @Redirect('habitaciones/listado')
  redirect() {}

  @Get('/habitaciones/listado')
  @Render('pages/backend/habitaciones-listado')
  getPage(): any {
    return { message: 'Estoy en backend/habitaciones/listado' };
  }

  @Get('/habitaciones/nuevo')
  @Render('pages/backend/habitaciones-nuevo')
  getPageNuevo(): any {
    return { message: 'Estoy en backend/habitaciones/nuevo' };
  }
}
