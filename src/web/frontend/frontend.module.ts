import { Module } from '@nestjs/common';

import { HotelModule } from '../../api/hoteles/hotel.module';
import { HomeController } from './home.controller';
import { LandingController } from './landing.controller';

@Module({
  imports: [HotelModule],
  controllers: [HomeController, LandingController],
})
export class FrontendModule {}
