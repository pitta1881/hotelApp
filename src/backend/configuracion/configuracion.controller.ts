import { Controller, Get, Render } from '@nestjs/common';

import { ConfiguracionService } from './configuracion.service';

@Controller('backend')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Get('/configuracion')
  @Render('pages/backend/configuracion')
  getPage(): any {
    return { message: 'Estoy en backend/configuracion' };
  }
}
