import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserJWT } from './../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { HabitacionesService } from './habitaciones.service';
import { GetHabitacionDto } from './dtos/get-habitacion.dto';
import { CreateHabitacionDto } from './dtos/create-habitacion.dto';
import { UpdateHabitacionDto } from './dtos/update-habitacion.dto';
import { UpdateEstadoHabitacionDto } from './dtos/update-estado-habitacion.dto';

@ApiTags('Habitaciones')
@ApiBearerAuth()
@Controller('api/habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @ApiOperation({ summary: 'FindAll Habitaciones (HotelId en JWT)' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.habitacionesService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Habitacion' })
  @Get(':id')
  async findOne(@Param() { id }: GetHabitacionDto) {
    return await this.habitacionesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Habitacion (HotelId en JWT)' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createHabitacionDto: CreateHabitacionDto,
  ) {
    return await this.habitacionesService.create(createHabitacionDto, hotelId);
  }

  @ApiOperation({ summary: 'Update Habitacion' })
  @Patch(':id')
  async update(
    @Param() { id }: GetHabitacionDto,
    @Body() updateHabitacionDto: UpdateHabitacionDto,
  ) {
    return await this.habitacionesService.update(id, updateHabitacionDto);
  }

  @ApiOperation({ summary: 'Update Estado Habitacion' })
  @Patch('ocupado/:id')
  async updateEstado(
    @Param() { id }: GetHabitacionDto,
    @Body() { ocupado }: UpdateEstadoHabitacionDto,
  ) {
    return await this.habitacionesService.setEstado(id, ocupado);
  }

  @ApiOperation({ summary: 'Delete Habitacion' })
  @Delete(':id')
  async remove(@Param() { id }: GetHabitacionDto) {
    return await this.habitacionesService.delete(id);
  }
}
