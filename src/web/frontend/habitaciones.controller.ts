import { Controller, Get, Param, Render } from '@nestjs/common';

import { Public } from './../../decorators/public.decorator';
import { HotelService } from './../../api/hoteles/hotel.service';

@Controller()
export class HabitacionesController {
  constructor(private readonly hotelService: HotelService) {}

  @Public()
  @Get(':nombre_uri/habitaciones')
  @Render('pages/frontend/habitaciones')
  async renderHabitaciones(@Param('nombre_uri') nombre_uri: string) {
    const resp = await this.hotelService.findOneByNombreUri(nombre_uri, [
      'habitaciones',
      'habitaciones.tipoHabitacion',
      'habitaciones.fotos',
      'habitaciones.servicios',
    ]);
    return { hotel: resp.data[0] };
  }
}
