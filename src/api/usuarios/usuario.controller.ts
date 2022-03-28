import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsuarioService } from './usuario.service';
import { UserJWT } from '../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dtos/usuario.dto';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('api/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'FindAll Usuarios' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.usuarioService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Usuario' })
  @Get(':id')
  async findOne(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.usuarioService.findOne(hotelId, id);
  }

  @ApiOperation({ summary: 'Create Usuario' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return await this.usuarioService.create(hotelId, createUsuarioDto);
  }

  @ApiOperation({ summary: 'Update Usuario' })
  @Patch(':id')
  update(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(hotelId, id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Delete Usuario' })
  @Delete(':id')
  remove(
    @UserJWT() { hotelId }: IJwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuarioService.delete(hotelId, id);
  }
}
