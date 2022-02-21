import { ServiciosService } from './servicios.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  @Render('pages/frontend/servicios')
  getPage(): any {
    return { message: 'Estoy en Servicios' };
  }
}
