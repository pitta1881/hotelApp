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

import { UserJWT } from '../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { FotosHabitacionService } from './fotos-habitacion.service';
import { GetFotosHabitacionDto } from './dtos/get-fotos-habitacion.dto';
import { CreateFotosHabitacionDto } from './dtos/create-fotos-habitacion.dto';
import { UpdateFotosHabitacionDto } from './dtos/update-fotos-habitacion.dto';
import { GetFotosHabitacion2Dto } from './dtos/get-fotos-habitacion-2.dto';
@ApiTags('Fotos Habitaciones')
@ApiBearerAuth()
@Controller('api/habitaciones')
export class FotosHabitacionController {
  constructor(
    private readonly fotosHabitacionService: FotosHabitacionService,
  ) {}

  @ApiOperation({ summary: 'FindAll Fotos Habitacion (HotelId en JWT)' })
  @Get(':habitacionId/fotos')
  async findAll(@Param() { habitacionId }: GetFotosHabitacionDto) {
    return await this.fotosHabitacionService.findAll(habitacionId);
  }

  @ApiOperation({ summary: 'FindOne Foto Habitacion' })
  @Get(':habitacionId/fotos/:id')
  async findOne(@Param() { habitacionId, id }: GetFotosHabitacion2Dto) {
    return await this.fotosHabitacionService.findOne(habitacionId, id);
  }

  @ApiOperation({ summary: 'Create Foto Habitacion (HotelId en JWT)' })
  @Post(':habitacionId/fotos')
  async create(
    @Param() { habitacionId }: GetFotosHabitacionDto,
    @Body() data: CreateFotosHabitacionDto,
  ) {
    return await this.fotosHabitacionService.create(data, habitacionId);
  }

  @ApiOperation({ summary: 'Update Foto Habitacion' })
  @Patch(':habitacionId/fotos/:id')
  async update(
    @Param() { habitacionId, id }: GetFotosHabitacion2Dto,
    @Body() data: UpdateFotosHabitacionDto,
  ) {
    return await this.fotosHabitacionService.update(habitacionId, id, data);
  }

  @ApiOperation({ summary: 'Delete Foto Habitacion' })
  @Delete(':habitacionId/fotos/:id')
  async remove(@Param() { habitacionId, id }: GetFotosHabitacion2Dto) {
    return await this.fotosHabitacionService.delete(habitacionId, id);
  }
}
