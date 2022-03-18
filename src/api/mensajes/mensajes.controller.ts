import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from './../../decorators/public.decorator';
import { MensajesService } from './mensajes.service';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { GetMensajeDto } from './dtos/get-mensaje.dto';
import { CreateMensajeDto } from './dtos/create-mensaje.dto';
import { UpdateEstadoMensajeDto } from './dtos/update-estado-mensaje.dto';

@ApiTags('Mensajes')
@ApiBearerAuth()
@Controller('api/mensajes')
export class MensajesController {
  constructor(private readonly mensajeService: MensajesService) {}

  @ApiOperation({ summary: 'FindAll Mensajes (HotelId en JWT)' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.mensajeService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Mensaje' })
  @Get(':id')
  async findOne(@Param() { id }: GetMensajeDto) {
    return await this.mensajeService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create Mensaje (enviar tambien hotelId) - PÚBLICO',
  })
  @Public()
  @Post()
  async create(@Body() data: CreateMensajeDto) {
    return await this.mensajeService.create(data);
  }

  @ApiOperation({ summary: 'Update Estado Mensaje' })
  @Patch('visto/:id')
  async updateEstado(
    @Param() { id }: GetMensajeDto,
    @Body() { leido }: UpdateEstadoMensajeDto,
  ) {
    return await this.mensajeService.setEstado(id, leido);
  }
}
