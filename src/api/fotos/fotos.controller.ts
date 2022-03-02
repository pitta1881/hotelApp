import { Controller, Get } from '@nestjs/common';

import { FotosService } from './fotos.service';

@Controller('api')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}
}
