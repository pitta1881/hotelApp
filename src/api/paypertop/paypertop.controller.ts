import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  ParseBoolPipe,
} from '@nestjs/common';

import { IPaypertop } from './paypertop.interface';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import {
  getPaypertopSchema,
  createPaypertopSchema,
  updatePaypertopSchema,
} from './paypertop.schemas';
import { PaypertopService } from './paypertop.service';
import { IUsuario } from '../usuarios/usuario.interface';
import { UserJWT } from './../../decorators/userJWT.decorator';

@Controller('api/paypertop')
export class PaypertopController {
  constructor(private readonly paypertopService: PaypertopService) {}

  @Get()
  async findAll(@UserJWT() user: IUsuario) {
    return await this.paypertopService.findAll(user.hotelId);
  }

  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getPaypertopSchema)) { id }: { id: number },
  ) {
    return await this.paypertopService.findOne(id);
  }

  @Post()
  async create(
    @UserJWT() user: IUsuario,
    @Body(new JoiValidationPipe(createPaypertopSchema)) data: IPaypertop,
  ) {
    return await this.paypertopService.create(data, user.hotelId);
  }

  @Patch(':id')
  async update(
    @Param(new JoiValidationPipe(getPaypertopSchema)) { id }: { id: number },
    @Body(new JoiValidationPipe(updatePaypertopSchema)) data: IPaypertop,
  ) {
    return await this.paypertopService.update(id, data);
  }

  @Patch('activo/:id')
  async updateEstado(
    @Param(new JoiValidationPipe(getPaypertopSchema)) { id }: { id: number },
    @Body('activo', ParseBoolPipe)
    activo: boolean,
  ) {
    return await this.paypertopService.setEstado(id, activo);
  }

  @Delete(':id')
  async remove(
    @Param(new JoiValidationPipe(getPaypertopSchema)) { id }: { id: number },
  ) {
    return await this.paypertopService.delete(id);
  }
}
