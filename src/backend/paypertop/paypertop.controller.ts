import { Controller, Get, Render } from '@nestjs/common';

import { PaypertopService } from './paypertop.service';

@Controller('backend')
export class PaypertopController {
  constructor(private readonly generalService: PaypertopService) {}

  @Get('/paypertop')
  @Render('pages/backend/paypertop')
  getPage(): any {
    return { message: 'Estoy en backend/paypertop' };
  }
}
