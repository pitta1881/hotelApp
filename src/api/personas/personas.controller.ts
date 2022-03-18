import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Personas')
@ApiBearerAuth()
@Controller('personas')
export class PersonasController {}
