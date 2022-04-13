import { Controller, Get, Render } from '@nestjs/common';

import { Public } from './../../decorators/public.decorator';
import { HotelService } from './../../api/hoteles/hotel.service';

@Controller()
export class LandingController {
  constructor(private readonly hotelService: HotelService) {}

  @Public()
  @Get()
  @Render('pages/frontend/landing')
  async renderLanding() {
    const resp = await this.hotelService.findAll(['servicios', 'fotos']);
    return { hoteles: resp.data };
  }
}
