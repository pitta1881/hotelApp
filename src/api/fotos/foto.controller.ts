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
import { FotoService } from './foto.service';
import { CreateFotoHotelDto, UpdateFotoHotelDto } from './dtos/foto-hotel.dto';

@ApiTags('Fotos Hotel')
@ApiBearerAuth()
@Controller('api/fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @ApiOperation({ summary: 'FindAll Fotos Hotel' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.fotoService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindAll Tipo Carousel' })
  @Get('tiposCarousel')
  async findAllTipo() {
    return await this.fotoService.findAllTipo();
  }

  @ApiOperation({ summary: 'FindAll Fotos Hotel With Carousel ' })
  @Get('carousel/:carouselId')
  async findAllWithCarousel(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('carouselId', ParseIntPipe) carouselId: number,
  ) {
    return await this.fotoService.findAllWithCarousel(hotelId, carouselId);
  }

  @ApiOperation({ summary: 'FindOne Foto Hotel' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.fotoService.findOne(hotelId, id);
  }

  @ApiOperation({ summary: 'Create Foto Hotel' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() data: CreateFotoHotelDto,
  ) {
    return await this.fotoService.create(hotelId, data);
  }

  @ApiOperation({ summary: 'Update Foto Hotel' })
  @Patch(':id')
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFotoHotelDto,
  ) {
    return await this.fotoService.update(hotelId, id, data);
  }

  @ApiOperation({ summary: 'Delete Foto Hotel' })
  @Delete(':id')
  async remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.fotoService.delete(hotelId, id);
  }
}
