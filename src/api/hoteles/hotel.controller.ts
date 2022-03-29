import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserJWT } from 'src/decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { Public } from '../../decorators/public.decorator';
import { CreateHotelDto, UpdateHotelDto } from './dtos/hotel.dto';
import { HotelService } from './hotel.service';

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
}
