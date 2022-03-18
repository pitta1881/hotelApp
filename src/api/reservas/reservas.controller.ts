import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReservasService } from './reservas.service';

@ApiTags('Reservas')
@ApiBearerAuth()
@Controller('api')
export class ReservasController {
  constructor(private readonly generalService: ReservasService) {}
}
