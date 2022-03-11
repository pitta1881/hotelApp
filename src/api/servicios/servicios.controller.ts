import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  ParseBoolPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { IServicio } from './servicios.interface';
import {
  getServiciosSchema,
  createServiciosSchema,
  updateServiciosSchema,
  associateServiceToHabitacionSchema,
} from './servicios.schemas';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import { IUsuario } from './../usuarios/usuario.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { ServiciosService } from './servicios.service';

@Controller('api/servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get('hotel')
  async findAllHotel(@UserJWT() user: IUsuario) {
    return await this.serviciosService.findAllHotel(user.hotelId);
  }

  @Get('habitacion/:id')
  async findAllHabitacion(
    @UserJWT() user: IUsuario,
    @Param('id', ParseIntPipe)
    @Param(new JoiValidationPipe(getServiciosSchema))
    id: number,
  ) {
    return await this.serviciosService.findAllHabitacion(id, user.hotelId);
  }

  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getServiciosSchema)) { id }: { id: number },
  ) {
    return await this.serviciosService.findOne(id);
  }

  @Post('hotel')
  async createServiceHotel(
    @UserJWT() user: IUsuario,
    @Body('servInstal', ParseBoolPipe)
    servInstal: boolean,
    @Body(new JoiValidationPipe(createServiciosSchema)) data: IServicio,
  ) {
    return await this.serviciosService.createServiceHotel(
      { ...data, servInstal },
      user.hotelId,
    );
  }

  @Post('habitacion')
  async manageServicioHabitacion(
    @UserJWT() user: IUsuario,
    @Body('operacion', ParseBoolPipe)
    operacion: boolean,
    @Body('habitacionId', ParseIntPipe)
    habitacionId: number,
    @Body('servicioId', ParseIntPipe)
    servicioId: number,
    @Body(new JoiValidationPipe(associateServiceToHabitacionSchema))
    data,
  ) {
    return await this.serviciosService.manageServicioHabitacion(
      { ...data, operacion, habitacionId, servicioId },
      user.hotelId,
    );
  }

  @Patch(':id')
  async update(
    @Param(new JoiValidationPipe(getServiciosSchema)) { id }: { id: number },
    @Body(new JoiValidationPipe(updateServiciosSchema)) data: IServicio,
  ) {
    return await this.serviciosService.update(id, data);
  }

  @Delete(':id')
  async remove(
    @Param(new JoiValidationPipe(getServiciosSchema)) { id }: { id: number },
  ) {
    return await this.serviciosService.delete(id);
  }
}
