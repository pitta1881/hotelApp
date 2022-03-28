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
import { PaypertopService } from './paypertop.service';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { CreatePaypertopDto, UpdatePaypertopDto } from './dtos/paypertop.dto';
import { UpdateEstadoPaypertopDto } from './dtos/update-estado-paypertop.dto';

@ApiTags('PayPerTop')
@ApiBearerAuth()
@Controller('api/paypertop')
export class PaypertopController {
  constructor(private readonly paypertopService: PaypertopService) {}

  @ApiOperation({ summary: 'FindAll PayPerTops' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.paypertopService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne PayPerTop' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paypertopService.findOne(hotelId, id);
  }

  @ApiOperation({ summary: 'Create PayPerTop' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createPaypertopDto: CreatePaypertopDto,
  ) {
    return await this.paypertopService.create(hotelId, createPaypertopDto);
  }

  @ApiOperation({ summary: 'Update PayPerTop' })
  @Patch(':id')
  async update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaypertopDto: UpdatePaypertopDto,
  ) {
    return await this.paypertopService.update(hotelId, id, updatePaypertopDto);
  }

  @ApiOperation({ summary: 'Update Estado PayPerTop' })
  @Patch('activo/:id')
  async updateEstado(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() { activo }: UpdateEstadoPaypertopDto,
  ) {
    return await this.paypertopService.setEstado(hotelId, id, activo);
  }

  @ApiOperation({ summary: 'Delete PayPerTop' })
  @Delete(':id')
  async remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paypertopService.delete(hotelId, id);
  }
}
