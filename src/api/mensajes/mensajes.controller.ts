import { Public } from './../../decorators/public.decorator';
import { IMensaje } from './mensajes.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseBoolPipe,
} from '@nestjs/common';

import { MensajesService } from './mensajes.service';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import { getMensajeSchema, createMensajeSchema } from './mensajes.schemas';
import { IUsuario } from '../usuarios/usuario.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';

@Controller('api/mensajes')
export class MensajesController {
  constructor(private readonly mensajeService: MensajesService) {}

  @Get()
  async findAll(@UserJWT() user: IUsuario) {
    return await this.mensajeService.findAll(user.hotelId);
  }

  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getMensajeSchema)) { id }: { id: number },
  ) {
    return await this.mensajeService.findOne(id);
  }

  @Public()
  @Post()
  async create(
    @Body(new JoiValidationPipe(createMensajeSchema)) data: IMensaje,
  ) {
    return await this.mensajeService.create(data);
  }

  @Patch('visto/:id')
  async updateEstado(
    @Param(new JoiValidationPipe(getMensajeSchema)) { id }: { id: number },
    @Body('leido', ParseBoolPipe)
    leido: boolean,
  ) {
    return await this.mensajeService.setEstado(id, leido);
  }
}
