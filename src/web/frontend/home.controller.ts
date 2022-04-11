import { Controller, Get, Param, Render } from '@nestjs/common';

import { Public } from './../../decorators/public.decorator';
import { HotelService } from './../../api/hoteles/hotel.service';

@Controller()
export class HomeController {
  constructor(private readonly hotelService: HotelService) {}

  @Public()
  @Get(':nombre_uri')
  @Render('pages/frontend/home')
  async renderHome(@Param('nombre_uri') nombre_uri: string) {
    const resp = await this.hotelService.findOneByNombreUri(nombre_uri, [
      'fotos',
      'fotos.tipoCarousel',
    ]);
    resp.data[0].fotos = resp.data[0].fotos.filter(
      (foto) => foto.tipoCarousel.id === 1,
    );
    return { hotel: resp.data[0] };
  }
}
