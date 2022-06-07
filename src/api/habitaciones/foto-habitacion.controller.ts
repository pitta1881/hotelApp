import { multerOptions } from './../multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

import { FotoHabitacionService } from './foto-habitacion.service';
import {
  CreateFotoHabitacionDto,
  UpdateFotoHabitacionDto,
} from './dtos/foto-habitacion.dto';
import { Public } from './../../decorators/public.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { HotelService } from '../hoteles/hotel.service';
import { Hotel } from './../../db/entities/hotel.entity';

@ApiTags('Fotos Habitaciones')
@ApiBearerAuth()
@Controller('api/habitaciones')
export class FotoHabitacionController {
  constructor(
    private readonly fotoHabitacionService: FotoHabitacionService,
    private readonly hotelService: HotelService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'FindAll Fotos Habitacion por HotelUri - PÚBLICO' })
  @Get(':hotel_uri/:habitacionId/fotos')
  async findAllByHotelUri(
    @Param('hotel_uri') hotel_uri: string,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
  ) {
    const resp = await this.hotelService.findOneByNombreUri(hotel_uri);
    const hotel: Hotel = resp.data[0];
    return await this.fotoHabitacionService.findAll(hotel.id, habitacionId);
  }

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        descripcion: { type: 'string' },
        foto_habitacion: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':habitacionId/fotos')
  @UseInterceptors(FileInterceptor('foto_habitacion', multerOptions))
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Body() data: CreateFotoHabitacionDto,
    @UploadedFile() foto_habitacion: Express.Multer.File,
  ) {
    return await this.fotoHabitacionService.create(
      hotelId,
      habitacionId,
      data,
      foto_habitacion.filename,
    );
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
