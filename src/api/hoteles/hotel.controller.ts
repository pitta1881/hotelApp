import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserJWT } from './../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { Public } from '../../decorators/public.decorator';
import { CreateHotelDto, UpdateHotelDto } from './dtos/hotel.dto';
import { HotelService } from './hotel.service';
import { multerOptions } from './../multer.config';

@ApiTags('Hoteles')
@ApiBearerAuth()
@Controller('api/hoteles')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @ApiOperation({ summary: 'FindAll Hoteles - PÚBLICO' })
  @Public()
  @Get()
  async findAll() {
    return await this.hotelService.findAll();
  }

  @ApiOperation({ summary: 'Find Hotel This (JWT)' })
  @Get('this')
  async findOneJWT(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.hotelService.findOne(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Hotel - PÚBLICO' })
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.hotelService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Hotel' })
  @Post()
  async create(@Body() data: CreateHotelDto) {
    return await this.hotelService.create(data);
  }

  @ApiOperation({ summary: 'Update Hotel' })
  @Patch()
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() data: UpdateHotelDto,
  ) {
    return await this.hotelService.update(hotelId, data);
  }

  @ApiOperation({ summary: 'Upload Logo Hotel ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-logo')
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async uploadFile(
    @UserJWT() { hotelId }: IJwtPayload,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.hotelService.updateLogo(hotelId, logo.filename);
  }
}
