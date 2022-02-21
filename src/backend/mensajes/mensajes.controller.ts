import { Controller, Get, Render } from '@nestjs/common';

import { MensajesService } from './mensajes.service';

@Controller('backend')
export class MensajesController {
  constructor(private readonly generalService: MensajesService) {}

  @Get('/mensajes')
  @Render('pages/backend/mensajes')
  getPage(): any {
    return { message: 'Estoy en backend/mensajes' };
  }
}
