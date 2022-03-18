import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsuariosService } from './usuarios.service';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { IJwtPayload } from '../auth/jwtPayload.interface';
import { GetUsuarioDto } from './dtos/get-usuario.dto';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @ApiOperation({ summary: 'FindAll Usuarios (HotelId en JWT)' })
  @Get()
  async findAll(@UserJWT() { hotelId }: IJwtPayload) {
    return await this.usuarioService.findAll(hotelId);
  }

  @ApiOperation({ summary: 'FindOne Usuario' })
  @Get(':id')
  async findOne(@Param() { id }: GetUsuarioDto) {
    return await this.usuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Usuario (HotelId en JWT de User Admin)' })
  @Post()
  async create(
    @UserJWT() { hotelId }: IJwtPayload,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return await this.usuarioService.create(createUsuarioDto, hotelId);
  }

  @ApiOperation({ summary: 'Update Usuario' })
  @Patch(':id')
  update(
    @Param() { id }: GetUsuarioDto,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Delete Usuario' })
  @Delete(':id')
  remove(@Param() { id }: GetUsuarioDto) {
    return this.usuarioService.delete(id);
  }
}
