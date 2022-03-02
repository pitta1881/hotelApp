import { Controller, Get } from '@nestjs/common';

import { ReservasService } from './reservas.service';

@Controller('api')
export class ReservasController {
  constructor(private readonly generalService: ReservasService) {}
}
