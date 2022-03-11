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
import { IMensaje } from './mensajes.interface';
import { Hotel } from './../../db/entities/hotel.entity';
import { HotelesService } from '../hoteles/hoteles.service';

@Injectable()
export class MensajesService {
  constructor(
    private hotelesService: HotelesService,
    @InjectRepository(Mensaje)
    private mensajeModel: Repository<Mensaje>,
  ) {}

  async findAll(hotelId: number): Promise<IGenericResponse> {
    const mensajes: Mensaje[] = await this.mensajeModel.find({
      where: {
        hotel: hotelId,
      },
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
    const hotelResp: IGenericResponse = await this.hotelesService.findOne(
      data.hotelId,
    );
    const hotel: Hotel = hotelResp.data[0];
    try {
      const newMensaje = await this.mensajeModel.save({
        ...data,
        hotel,
      });
      return {
        status: StatusTypes.success,
        data: [newMensaje],
      };
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  async setEstado(id: number, newEstado: boolean): Promise<IGenericResponse> {
    const mensajeResp: IGenericResponse = await this.findOne(id);
    let mensaje: Mensaje = mensajeResp.data[0];
    mensaje = await this.mensajeModel.save({
      ...mensaje,
      leido: newEstado,
    });
    return {
      status: StatusTypes.success,
      data: [mensaje],
    };
  }
}
