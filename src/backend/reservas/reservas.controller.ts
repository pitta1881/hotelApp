import { Controller, Get, Render, Redirect } from '@nestjs/common';

import { ReservasService } from './reservas.service';

@Controller('backend')
export class ReservasController {
  constructor(private readonly generalService: ReservasService) {}

  @Get('/reservas')
  @Redirect('reservas/listado')
  redirect() {}

  @Get('/reservas/listado')
  @Render('pages/backend/reservas-listado')
  getPage(): any {
    return { message: 'Estoy en backend/reservas/listado' };
  }

  @Get('/reservas/nuevo')
  @Render('pages/backend/reservas-nuevo')
  getPageNuevo(): any {
    return { message: 'Estoy en backend/reservas/nuevo' };
  }
}
