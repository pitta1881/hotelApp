import { Controller, Get, Param, Render } from '@nestjs/common';

import { Public } from './../../decorators/public.decorator';
import { HotelService } from './../../api/hoteles/hotel.service';

@Controller()
export class ContactoController {
  constructor(private readonly hotelService: HotelService) {}

  @Public()
  @Get(':nombre_uri/contacto')
  @Render('pages/frontend/contacto')
  async renderContacto(@Param('nombre_uri') nombre_uri: string) {
    const resp = await this.hotelService.findOneByNombreUri(nombre_uri);
    return { hotel: resp.data[0] };
  }
}
