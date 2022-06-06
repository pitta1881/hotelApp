import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { ServicioService } from './servicio.service';
import { CreateServicioDto, UpdateServicioDto } from './dtos/servicio.dto';
import { multerOptions } from '../multer.config';

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
  @UseInterceptors(FileInterceptor('icon_service', multerOptions))
  async createServiceHotel(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createServicioDto: CreateServicioDto,
    @UploadedFile() icon_service: Express.Multer.File,
  ) {
    return await this.servicioService.createServiceHotel(
      hotelId,
      createServicioDto,
      icon_service.filename,
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

  @Post(':id/update-icon')
  @UseInterceptors(FileInterceptor('icon_service', multerOptions))
  async uploadFile(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() icon_service: Express.Multer.File,
  ) {
    return await this.servicioService.updateIcon(
      hotelId,
      id,
      icon_service.filename,
    );
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
