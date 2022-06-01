import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './../../decorators/public.decorator';

@Controller('backend')
export class BackendController {
  @Public()
  @Get('login')
  @Render('pages/backend/login')
  async renderLogin() {}

  @Get('general')
  @Render('pages/backend/general')
  async renderGeneral() {}

  @Get('paypertop')
  @Render('pages/backend/paypertop')
  async renderPayPerTop() {}

  @Get('mensajes')
  @Render('pages/backend/mensajes')
  async renderMensajes() {}

  @Get('huespedes')
  @Render('pages/backend/huespedes')
  async renderHuespedes() {}

  @Get('configuracion')
  @Render('pages/backend/configuracion')
  async renderConfiguracion() {}

  @Get('habitaciones')
  @Render('pages/backend/habitaciones')
  async renderHabitaciones() {}

  @Get('fotos')
  @Render('pages/backend/fotos')
  async renderFotos() {}

  @Get('reservas')
  @Render('pages/backend/reservas')
  async renderReservas() {}
}
