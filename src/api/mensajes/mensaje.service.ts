import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StatusTypes, IGenResp } from '../../helpers/generic.response';

import { Mensaje } from '../../db/entities/mensaje.entity';
import { Hotel } from '../../db/entities/hotel.entity';
import { HotelService } from '../hoteles/hotel.service';
import { CreateMensajeDto } from './dtos/mensaje.dto';

@Injectable()
export class MensajeService {
  constructor(
    private hotelService: HotelService,
    @InjectRepository(Mensaje)
    private mensajeModel: Repository<Mensaje>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
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

  async findOne(hotelId: number, id: number): Promise<IGenResp> {
    const mensaje: Mensaje = await this.mensajeModel.findOne({
      relations: ['hotel'],
      where: {
        hotel: hotelId,
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

  async create(newData: CreateMensajeDto): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelService.findOneByNombreUri(
      newData.hotel_nombre_uri,
    );
    const hotel: Hotel = hotelResp.data[0];
    try {
      const nextId = await this.findNextId(hotel.id);
      const newMensaje = await this.mensajeModel.save({
        hotel,
        ...newData,
        id: nextId,
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

  async setEstado(
    hotelId: number,
    id: number,
    newEstado: boolean,
  ): Promise<IGenResp> {
    const mensajeResp: IGenResp = await this.findOne(hotelId, id);
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

  private async findNextId(hotelId: number) {
    const entity = await this.mensajeModel.find({
      where: {
        hotel: hotelId,
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });
    return entity.length === 0 ? 1 : entity[0].id + 1;
  }
}
