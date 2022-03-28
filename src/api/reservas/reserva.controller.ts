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
import { CreateReservaDto, UpdateReservaDto } from './dtos/reserva.dto';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@ApiBearerAuth()
@Controller('api/reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @ApiOperation({ summary: 'FindAll Reservas' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.reservaService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Reserva' })
  @Get(':habitacionId/:id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.reservaService.findOne(hotelId, habitacionId, id);
  }

  @ApiOperation({ summary: 'Create Reserva' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createHuespedDto: CreateReservaDto,
  ) {
    return await this.reservaService.create(hotelId, createHuespedDto);
  }

  @ApiOperation({ summary: 'Update Reserva' })
  @Patch(':habitacionId/:id')
  update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHuespedDto: UpdateReservaDto,
  ) {
    return this.reservaService.update(
      hotelId,
      habitacionId,
      id,
      updateHuespedDto,
    );
  }

  @ApiOperation({ summary: 'Delete Reserva' })
  @Delete(':habitacionId/:id')
  remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservaService.delete(hotelId, habitacionId, id);
  }
}
