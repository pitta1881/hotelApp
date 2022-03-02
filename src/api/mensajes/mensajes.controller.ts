import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { MensajesService } from './mensajes.service';
import { Mensaje } from '../../db/entities/mensaje.entity';

@Controller('api')
export class MensajesController {
  constructor(private readonly mensajeService: MensajesService) {}

  @Get('/mensajes')
  async findAll(): Promise<Mensaje[]> {
    return await this.mensajeService.findAll();
  }

  @Get('/mensajes/:id')
  async findOne(@Param('id') id: number): Promise<Mensaje> {
    return await this.mensajeService.findOne(id);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }
}
