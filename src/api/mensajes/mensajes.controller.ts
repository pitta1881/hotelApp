import { IMensaje } from './mensaje.interface';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { MensajesService } from './mensajes.service';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import { getMensajeSchema, createMensajeSchema } from './mensaje.schemas';

@Controller('api')
export class MensajesController {
  constructor(private readonly mensajeService: MensajesService) {}

  @Get('/mensajes')
  async findAll() {
    return await this.mensajeService.findAll();
  }

  @Get('/mensajes/:id')
  async findOne(
    @Param(new JoiValidationPipe(getMensajeSchema)) { id }: { id: number },
  ) {
    return await this.mensajeService.findOne(id);
  }

  @Post('/mensajes')
  async create(
    @Body(new JoiValidationPipe(createMensajeSchema)) data: IMensaje,
  ) {
    return await this.mensajeService.create(data);
  }

  @Patch('/mensajes/visto/:id')
  update(
    @Param(new JoiValidationPipe(getMensajeSchema)) { id }: { id: number },
  ) {
    return this.mensajeService.setLeido(id);
  }
}
