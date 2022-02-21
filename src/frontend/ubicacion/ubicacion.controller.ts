import { UbicacionService } from './ubicacion.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get()
  @Render('pages/frontend/ubicacion')
  getPage(): any {
    return { message: 'Estoy en Ubicacion' };
  }
}
