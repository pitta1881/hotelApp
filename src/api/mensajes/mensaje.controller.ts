import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';
import { MensajeService } from './mensaje.service';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { CreateMensajeDto } from './dtos/mensaje.dto';
import { UpdateEstadoMensajeDto } from './dtos/update-estado-mensaje.dto';

@ApiTags('Mensajes')
@ApiBearerAuth()
@Controller('api/mensajes')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @ApiOperation({ summary: 'FindAll Mensajes' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.mensajeService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Mensaje' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.mensajeService.findOne(hotelId, id);
  }

  @ApiOperation({
    summary: 'Create Mensaje - PÚBLICO',
  })
  @Public()
  @Post()
  async create(@Body() data: CreateMensajeDto) {
    return await this.mensajeService.create(data);
  }

  @ApiOperation({ summary: 'Update Estado Mensaje' })
  @Patch('visto/:id')
  async updateEstado(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() { leido }: UpdateEstadoMensajeDto,
  ) {
    return await this.mensajeService.setEstado(hotelId, id, leido);
  }
}
