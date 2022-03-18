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
import { FotosService } from './fotos.service';
import { GetFotosHotelDto } from './dtos/get-fotos-hotel.dto';
import { CreateFotosHotelDto } from './dtos/create-fotos-hotel.dto';
import { UpdateFotosHotelDto } from './dtos/update-fotos-hotel.dto';
@ApiTags('Fotos')
@ApiBearerAuth()
@Controller('api/fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @ApiOperation({ summary: 'FindAll Fotos Hotel (HotelId en JWT)' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.fotosService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Foto Hotel' })
  @Get(':id')
  async findOne(@Param() { id }: GetFotosHotelDto) {
    return await this.fotosService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Foto Hotel (HotelId en JWT)' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() data: CreateFotosHotelDto,
  ) {
    return await this.fotosService.create(data, hotelId);
  }

  @ApiOperation({ summary: 'Update Foto Hotel' })
  @Patch(':id')
  async update(
    @Param() { id }: GetFotosHotelDto,
    @Body() data: UpdateFotosHotelDto,
  ) {
    return await this.fotosService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete Foto Hotel' })
  @Delete(':id')
  async remove(@Param() { id }: GetFotosHotelDto) {
    return await this.fotosService.delete(id);
  }
}
