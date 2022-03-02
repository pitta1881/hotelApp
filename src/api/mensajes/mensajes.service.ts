import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mensaje } from '../../db/entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeModel: Repository<Mensaje>,
  ) {}

  async findAll(): Promise<Mensaje[]> {
    return await this.mensajeModel.find();
  }

  async findOne(id: number): Promise<Mensaje> {
    return await this.mensajeModel.findOne({
      where: {
        id,
      },
    });
  }
}
