import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

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
    skip?: number,
    limit?: number,
  ): Promise<IGenResp> {
    const [servicios, total]: [servicios: Servicio[], total: number] =
      await this.servicioModel.findAndCount({
        relations,
        where: {
          hotel: hotelId,
        },
        skip,
        take: limit,
      });
    return {
      status: StatusTypes.success,
      total,
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
    path: string,
  ): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelesService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    try {
      const nextId = await this.findNextId(hotelId);
      const newServicio = await this.servicioModel.save({
        ...newData,
        id: nextId,
        icon_path: join('/', 'uploads', 'iconos-servicio', path),
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

  async updateIcon(
    hotelId: number,
    id: number,
    path: string,
  ): Promise<IGenResp> {
    const servicioResp: IGenResp = await this.findOne(hotelId, id);
    let servicio: Servicio = servicioResp.data[0];
    const oldPath = servicio.icon_path;
    servicio = await this.servicioModel.save({
      ...servicio,
      icon_path: join('/', 'uploads', 'iconos-servicio', path),
    });
    fs.unlink(join(__dirname, '..', '..', '..', 'public', oldPath), (err) => {
      if (err) {
        console.log(err);
        return {
          status: StatusTypes.error,
          error: err,
        };
      }
    });
    return {
      status: StatusTypes.success,
      data: [servicio],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    const servicioResp = await this.findOne(hotelId, id); //si falla salta una exception
    const servicio: Servicio = servicioResp.data[0];
    try {
      await this.servicioModel.remove(servicio);
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
