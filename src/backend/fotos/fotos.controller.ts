import { Controller, Get, Render } from '@nestjs/common';

import { FotosService } from './fotos.service';

@Controller('backend')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Get('/fotos')
  @Render('pages/backend/fotos')
  getPage(): any {
    return { message: 'Estoy en backend/fotos' };
  }
}
