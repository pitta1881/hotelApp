import { Controller, Get } from '@nestjs/common';

import { HabitacionesService } from './habitaciones.service';

@Controller('api')
export class HabitacionesController {
  constructor(private readonly generalService: HabitacionesService) {}
}
