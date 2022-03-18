import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { ServiciosService } from './servicios.service';
import { GetServicioDto } from './dtos/get-servicio.dto';
import { CreateServicioDto } from './dtos/create-servicio.dto';
import { AssociateServicioDto } from './dtos/associate-servicio.dto';
import { UpdateServicioDto } from './dtos/update-servicio.dto';

@ApiTags('Servicios')
@ApiBearerAuth()
@Controller('api/servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @ApiOperation({ summary: 'FindAll Servicios (HotelId en JWT)' })
  @Get('hotel')
  async findAllHotel(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.serviciosService.findAllHotel(hotelId);
  }

  @ApiOperation({
    summary: 'FindAll Servicios de habitacion especifica (HotelId en JWT)',
  })
  @Get('habitacion/:id')
  async findAllHabitacion(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param() { id }: GetServicioDto,
  ) {
    return await this.serviciosService.findAllHabitacion(id, hotelId);
  }

  @ApiOperation({ summary: 'FindOne Servicio' })
  @Get(':id')
  async findOne(@Param() { id }: GetServicioDto) {
    return await this.serviciosService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Servicio para Hotel (HotelId en JWT)' })
  @Post('hotel')
  async createServiceHotel(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createServicioDto: CreateServicioDto,
  ) {
    return await this.serviciosService.createServiceHotel(
      createServicioDto,
      hotelId,
    );
  }

  @ApiOperation({ summary: 'Asociar Servicio a Habitacion (HotelId en JWT)' })
  @Post('habitacion')
  async manageServicioHabitacion(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() associateServicioDto: AssociateServicioDto,
  ) {
    return await this.serviciosService.manageServicioHabitacion(
      associateServicioDto,
      hotelId,
    );
  }

  @ApiOperation({ summary: 'Update Servicio' })
  @Patch(':id')
  async update(
    @Param() { id }: GetServicioDto,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return await this.serviciosService.update(id, updateServicioDto);
  }

  @ApiOperation({ summary: 'Delete Servicio' })
  @Delete(':id')
  async remove(@Param() { id }: GetServicioDto) {
    return await this.serviciosService.delete(id);
  }
}
