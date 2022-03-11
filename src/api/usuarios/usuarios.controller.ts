import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import {
  getUsuarioSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
} from './usuarios.schemas';

import { UsuariosService } from './usuarios.service';
import { UserJWT } from './../../decorators/userJWT.decorator';
import { IUsuario } from './usuario.interface';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get()
  async findAll(@UserJWT() user: IUsuario) {
    return await this.usuarioService.findAll(user.hotelId);
  }

  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
  ) {
    return await this.usuarioService.findOne(id);
  }

  @Post()
  async create(
    @UserJWT() user: IUsuario,
    @Body(new JoiValidationPipe(createUsuarioSchema)) data: IUsuario,
  ) {
    return await this.usuarioService.create(data, user.hotelId);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
    @Body(new JoiValidationPipe(updateUsuarioSchema)) data: IUsuario,
  ) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  remove(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
  ) {
    return this.usuarioService.delete(id);
  }
}
