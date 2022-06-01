import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { StatusTypes, IGenResp } from './../../helpers/generic.response';
import { Servicio } from './../../db/entities/servicio.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { HotelService } from '../hoteles/hotel.service';
import { CreateServicioDto, UpdateServicioDto } from './dtos/servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    private hotelesService: HotelService,
    @InjectRepository(Servicio)
    private servicioModel: Repository<Servicio>,
  ) {}

  async findAllHotel(
    hotelId: number,
    relations: string[] = [],
  ): Promise<IGenResp> {
    const servicios: Servicio[] = await this.servicioModel.find({
      relations,
      where: {
        hotel: hotelId,
      },
    });
    return {
      status: StatusTypes.success,
      data: servicios,
    };
  }
  async findIfService(hotelId: number): Promise<IGenResp> {
    const servicios: Servicio[] = await this.servicioModel.find({
      relations: ['habitaciones'],
      where: {
        hotel: hotelId,
        servInstal: false,
      },
    });
    return {
      status: StatusTypes.success,
      data: servicios,
    };
  }

  async findOne(hotelId: number, id: number): Promise<IGenResp> {
    const servicio: Servicio = await this.servicioModel.findOne({
      relations: ['hotel', 'habitaciones', 'habitaciones.hotel'],
      where: {
        hotel: hotelId,
        id,
      },
    });
    if (!servicio) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El servicio no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [servicio],
    };
  }

  async createServiceHotel(
    hotelId: number,
    newData: CreateServicioDto,
  ): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelesService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    try {
      const nextId = await this.findNextId(hotelId);
      const newServicio = await this.servicioModel.save({
        ...newData,
        id: nextId,
        hotel: hotel,
      });
      return {
        status: StatusTypes.success,
        data: [newServicio],
      };
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  async update(
    hotelId: number,
    id: number,
    newData: UpdateServicioDto,
  ): Promise<IGenResp> {
    const servicioResp: IGenResp = await this.findOne(hotelId, id);
    let servicio: Servicio = servicioResp.data[0];
    servicio = await this.servicioModel.save({
      ...servicio,
      ...newData,
    });
    return {
      status: StatusTypes.success,
      data: [servicio],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id); //si falla salta una exception
    try {
      await this.servicioModel.delete({ id, hotel: { id: hotelId } });
      return {
        status: StatusTypes.success,
      };
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  private async findNextId(hotelId: number) {
    const entity = await this.servicioModel.find({
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
