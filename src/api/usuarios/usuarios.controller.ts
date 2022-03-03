import { IUsuario } from './usuario.interface';
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
  patchUsuarioSchema,
} from './usuarios.schemas';

import { UsuariosService } from './usuarios.service';

@Controller('api')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get('/usuarios')
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @Get('/usuarios/:id')
  async findOne(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
  ) {
    return await this.usuarioService.findOne(id);
  }

  @Post('/usuarios')
  async create(
    @Body(new JoiValidationPipe(createUsuarioSchema)) data: IUsuario,
  ) {
    return await this.usuarioService.create(data);
  }

  @Patch('/usuarios/:id')
  update(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
    @Body(new JoiValidationPipe(patchUsuarioSchema)) data: IUsuario,
  ) {
    return this.usuarioService.update(id, data);
  }

  @Delete('/usuarios/:id')
  remove(
    @Param(new JoiValidationPipe(getUsuarioSchema)) { id }: { id: number },
  ) {
    return this.usuarioService.delete(id);
  }
}
