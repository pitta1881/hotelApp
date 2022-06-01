import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserJWT } from '../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { HabitacionService } from './habitacion.service';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dtos/habitacion.dto';
import { UpdateEstadoHabitacionDto } from './dtos/update-estado-habitacion.dto';
import { AssociateServicioDto } from './dtos/associate-servicio.dto';

@ApiTags('Habitaciones')
@ApiBearerAuth()
@Controller('api/habitaciones')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @ApiOperation({ summary: 'FindAll Habitaciones' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.habitacionService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindAll Tipo Habitaciones' })
  @Get('tiposHabitaciones')
  async findAllTipo() {
    return await this.habitacionService.findAllTipo();
  }

  @ApiOperation({ summary: 'Asociar Servicio a Habitacion' })
  @Post('manage-servicios')
  async manageServicioHabitacion(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() associateServicioDto: AssociateServicioDto,
  ) {
    return await this.habitacionService.manageServicioHabitacion(
      hotelId,
      associateServicioDto,
    );
  }

  @ApiOperation({
    summary: 'FindAll Servicios de habitacion especifica',
  })
  @Get('servicios/:habitacionId')
  async findAllServicios(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
  ) {
    return await this.habitacionService.findAllServicios(hotelId, habitacionId);
  }

  @ApiOperation({
    summary: 'FindAll Servicios que no se encuentran en habitacion especifica',
  })
  @Get('notIn/servicios/:habitacionId')
  async findAllServiciosNotIn(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
  ) {
    return await this.habitacionService.findAllServiciosNotIn(
      hotelId,
      habitacionId,
    );
  }

  @ApiOperation({ summary: 'FindOne Habitacion' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.habitacionService.findOne(hotelId, id);
  }

  @ApiOperation({ summary: 'Create Habitacion' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createHabitacionDto: CreateHabitacionDto,
  ) {
    return await this.habitacionService.create(hotelId, createHabitacionDto);
  }

  @ApiOperation({ summary: 'Update Habitacion' })
  @Patch(':id')
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHabitacionDto: UpdateHabitacionDto,
  ) {
    return await this.habitacionService.update(
      hotelId,
      id,
      updateHabitacionDto,
    );
  }

  @ApiOperation({ summary: 'Update Estado Habitacion' })
  @Patch('activo/:id')
  async updateEstado(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() { activo }: UpdateEstadoHabitacionDto,
  ) {
    return await this.habitacionService.setEstado(hotelId, id, activo);
  }

  @ApiOperation({ summary: 'Delete Habitacion' })
  @Delete(':id')
  async remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.habitacionService.delete(hotelId, id);
  }
}
