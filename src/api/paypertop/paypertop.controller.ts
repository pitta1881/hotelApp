import { Controller, Get, Render } from '@nestjs/common';

import { PaypertopService } from './paypertop.service';

@Controller('api')
export class PaypertopController {
  constructor(private readonly generalService: PaypertopService) {}
}
