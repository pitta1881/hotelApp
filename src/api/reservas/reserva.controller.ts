import { AssociateHuespedDto } from './dtos/associate-huesped.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { CreateReservaDto, UpdateReservaDto } from './dtos/reserva.dto';
import { ReservaService } from './reserva.service';
import { QueryTableDto } from './../tables.dto';

@ApiTags('Reservas')
@ApiBearerAuth()
@Controller('api/reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @ApiOperation({ summary: 'FindAll Reservas' })
  @Get()
  async findAll(
    @UserJWT() { hotelId }: IJwtPayload,
    @Query() { skip, limit }: QueryTableDto,
  ) {
    return await this.reservaService.findAll(hotelId, skip, limit);
  }

  @ApiOperation({ summary: 'Asociar Huesped a Reserva' })
  @Post('manage-huespedes')
  async manageHuespedReserva(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() associateHuespedDto: AssociateHuespedDto,
  ) {
    return await this.reservaService.manageHuespedReserva(
      hotelId,
      associateHuespedDto,
    );
  }

  @ApiOperation({
    summary: 'FindAll Huespedes de reserva especifica',
  })
  @Get('huespedes/:reservaId')
  async findAllHuespedes(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('reservaId', ParseIntPipe) reservaId: number,
  ) {
    return await this.reservaService.findAllHuespedes(hotelId, reservaId);
  }

  @ApiOperation({
    summary: 'FindAll Huespedes que no se encuentran en reserva especifica',
  })
  @Get('notIn/huespedes/:reservaId')
  async findAllHuespedesNotIn(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('reservaId', ParseIntPipe) reservaId: number,
  ) {
    return await this.reservaService.findAllHuespedesNotIn(hotelId, reservaId);
  }

  @ApiOperation({ summary: 'FindOne Reserva' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.reservaService.findOne(hotelId, id);
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
  @Patch(':id')
  update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHuespedDto: UpdateReservaDto,
  ) {
    return this.reservaService.update(hotelId, id, updateHuespedDto);
  }

  @ApiOperation({ summary: 'Delete Reserva' })
  @Delete(':id')
  remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservaService.delete(hotelId, id);
  }
}
