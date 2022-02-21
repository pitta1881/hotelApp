import { ContactoService } from './contacto.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Get()
  @Render('pages/frontend/contacto')
  getPage(): any {
    return { message: 'Estoy en Contacto' };
  }
}
