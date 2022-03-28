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
import { AssociateHuespedDto } from './dtos/associate-huesped.dto';
import { CreateHuespedDto, UpdateHuespedDto } from './dtos/huesped.dto';
import { HuespedService } from './huesped.service';

@ApiTags('Huespedes')
@ApiBearerAuth()
@Controller('api/huespedes')
export class HuespedController {
  constructor(private readonly huespedService: HuespedService) {}

  @ApiOperation({ summary: 'FindAll Huespedes' })
  @Get()
  async findAll() {
    return await this.huespedService.findAll();
  }

  @ApiOperation({ summary: 'FindOne Huesped' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.huespedService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Huesped' })
  @Post()
  async create(@Body() createHuespedDto: CreateHuespedDto) {
    return await this.huespedService.create(createHuespedDto);
  }

  @ApiOperation({ summary: 'Asociar Huesped a Reserva' })
  @Post('reserva')
  async manageHuespedReserva(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() associateHuespedDto: AssociateHuespedDto,
  ) {
    return await this.huespedService.manageHuespedReserva(
      hotelId,
      associateHuespedDto,
    );
  }

  @ApiOperation({ summary: 'Update Huesped' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHuespedDto: UpdateHuespedDto,
  ) {
    return this.huespedService.update(id, updateHuespedDto);
  }

  @ApiOperation({ summary: 'Delete Huesped' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.huespedService.delete(id);
  }
}
