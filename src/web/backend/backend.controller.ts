import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './../../decorators/public.decorator';

@Controller('backend')
export class BackendController {
  @Public()
  @Get('login')
  @Render('pages/backend/login')
  async renderLogin() {}

  @Public()
  @Get('general')
  @Render('pages/backend/general')
  async renderGeneral() {}

  @Public()
  @Get('paypertop')
  @Render('pages/backend/paypertop')
  async renderPayPerTop() {}

  @Public()
  @Get('mensajes')
  @Render('pages/backend/mensajes')
  async renderMensajes() {}

  @Public()
  @Get('huespedes')
  @Render('pages/backend/huespedes')
  async renderHuespedes() {}

  @Public()
  @Get('configuracion')
  @Render('pages/backend/configuracion')
  async renderConfiguracion() {}

  @Public()
  @Get('habitaciones')
  @Render('pages/backend/habitaciones')
  async renderHabitaciones() {}

  @Public()
  @Get('fotos')
  @Render('pages/backend/fotos')
  async renderFotos() {}
}
