import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import { IUsuario } from '../usuarios/usuario.interface';
import { IHabitacion } from './habitaciones.interface';
import {
  createHabitacionSchema,
  getHabitacionSchema,
  updateHabitacionSchema,
} from './habitaciones.schemas';

import { HabitacionesService } from './habitaciones.service';

@Controller('api/habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Get()
  async findAll(@UserJWT() user: IUsuario) {
    return await this.habitacionesService.findAll(user.hotelId);
  }

  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getHabitacionSchema)) { id }: { id: number },
  ) {
    return await this.habitacionesService.findOne(id);
  }

  @Post()
  async create(
    @UserJWT() user: IUsuario,
    @Body(new JoiValidationPipe(createHabitacionSchema)) data: IHabitacion,
  ) {
    return await this.habitacionesService.create(data, user.hotelId);
  }

  @Patch(':id')
  async update(
    @Param(new JoiValidationPipe(getHabitacionSchema)) { id }: { id: number },
    @Body(new JoiValidationPipe(updateHabitacionSchema)) data: IHabitacion,
  ) {
    return await this.habitacionesService.update(id, data);
  }

  @Patch('ocupado/:id')
  async updateEstado(
    @Param(new JoiValidationPipe(getHabitacionSchema)) { id }: { id: number },
    @Body('ocupado', ParseBoolPipe)
    ocupado: boolean,
  ) {
    return await this.habitacionesService.setEstado(id, ocupado);
  }

  @Delete(':id')
  async remove(
    @Param(new JoiValidationPipe(getHabitacionSchema)) { id }: { id: number },
  ) {
    return await this.habitacionesService.delete(id);
  }
}
