import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  StatusTypes,
  IGenericResponse,
} from './../../helpers/generic.response';

import { Mensaje } from '../../db/entities/mensaje.entity';
import { IMensaje } from './mensaje.interface';
import { Hotel } from 'src/db/entities/hotel.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeModel: Repository<Mensaje>,
    @InjectRepository(Hotel)
    private hotelModel: Repository<Hotel>,
  ) {}

  async findAll(): Promise<IGenericResponse> {
    const mensajes: Mensaje[] = await this.mensajeModel.find({
      relations: ['hotel'],
    });
    return {
      status: StatusTypes.success,
      data: mensajes,
    };
  }

  async findOne(id: number): Promise<IGenericResponse> {
    const mensaje: Mensaje = await this.mensajeModel.findOne({
      where: {
        id,
      },
      relations: ['hotel'],
    });
    if (!mensaje) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El mensaje no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [mensaje],
    };
  }

  async create(data: IMensaje): Promise<IGenericResponse> {
    let newMensaje: Mensaje;
    const hotel: Hotel = await this.hotelModel.findOne({
      where: { id: data.hotelId },
    });
    if (hotel) {
      try {
        newMensaje = await this.mensajeModel.save({ ...data, hotel });
      } catch (error) {
        throw new ConflictException({
          status: StatusTypes.error,
          error: error.detail,
        });
      }
    } else {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [newMensaje],
    };
  }

  async setLeido(id: number): Promise<IGenericResponse> {
    const mensaje: IGenericResponse = await this.findOne(id);
    const mensajeModel: Mensaje = mensaje.data[0];
    if (mensaje.status === 'SUCCESS') {
      this.mensajeModel.update(id, {
        leido: true,
      });
    } else {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El mensaje no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [{ ...mensajeModel, leido: true }],
    };
  }
}
