import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { ServicioService } from './servicio.service';
import { CreateServicioDto, UpdateServicioDto } from './dtos/servicio.dto';

@ApiTags('Servicios')
@ApiBearerAuth()
@Controller('api/servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @ApiOperation({ summary: 'FindAll Servicios' })
  @Get('hotel')
  async findAllHotel(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.servicioService.findAllHotel(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Servicio' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.servicioService.findOne(hotelId, id);
  }

  @ApiOperation({ summary: 'Create Servicio para Hotel' })
  @Post('hotel')
  async createServiceHotel(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createServicioDto: CreateServicioDto,
  ) {
    return await this.servicioService.createServiceHotel(
      hotelId,
      createServicioDto,
    );
  }

  @ApiOperation({ summary: 'Update Servicio' })
  @Patch(':id')
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return await this.servicioService.update(hotelId, id, updateServicioDto);
  }

  @ApiOperation({ summary: 'Delete Servicio' })
  @Delete(':id')
  async remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.servicioService.delete(hotelId, id);
  }
}
