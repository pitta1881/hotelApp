import { Controller, Get, Render, Redirect } from '@nestjs/common';

import { GeneralService } from './general.service';

@Controller('backend')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get()
  @Redirect('backend/general')
  redirect() {}

  @Get('/general')
  @Render('pages/backend/general')
  getPage(): any {
    return { message: 'Estoy en backend/general' };
  }
}
