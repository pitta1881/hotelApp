import { HomeService } from './home.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('pages/frontend/home')
  getPage(): any {
    return { message: 'Estoy en Home' };
  }
}
