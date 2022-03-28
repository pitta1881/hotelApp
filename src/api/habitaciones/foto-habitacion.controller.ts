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

import { FotoHabitacionService } from './foto-habitacion.service';
import {
  CreateFotoHabitacionDto,
  UpdateFotoHabitacionDto,
} from './dtos/foto-habitacion.dto';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from '../../decorators/userJWT.decorator';

@ApiTags('Fotos Habitaciones')
@ApiBearerAuth()
@Controller('api/habitaciones')
export class FotoHabitacionController {
  constructor(private readonly fotoHabitacionService: FotoHabitacionService) {}

  @ApiOperation({ summary: 'FindAll Fotos Habitacion' })
  @Get(':habitacionId/fotos')
  async findAll(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
  ) {
    return await this.fotoHabitacionService.findAll(hotelId, habitacionId);
  }

  @ApiOperation({ summary: 'FindOne Foto Habitacion' })
  @Get(':habitacionId/fotos/:id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.fotoHabitacionService.findOne(hotelId, habitacionId, id);
  }

  @ApiOperation({ summary: 'Create Foto Habitacion' })
  @Post(':habitacionId/fotos')
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Body() data: CreateFotoHabitacionDto,
  ) {
    return await this.fotoHabitacionService.create(hotelId, habitacionId, data);
  }

  @ApiOperation({ summary: 'Update Foto Habitacion' })
  @Patch(':habitacionId/fotos/:id')
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFotoHabitacionDto,
  ) {
    return await this.fotoHabitacionService.update(
      hotelId,
      habitacionId,
      id,
      data,
    );
  }

  @ApiOperation({ summary: 'Delete Foto Habitacion' })
  @Delete(':habitacionId/fotos/:id')
  async remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.fotoHabitacionService.delete(hotelId, habitacionId, id);
  }
}
