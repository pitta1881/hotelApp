import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoHabitacion } from '../../db/entities/tipoHabitacion.entity';
import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { Hotel } from '../../db/entities/hotel.entity';
import { Habitacion } from '../../db/entities/habitacion.entity';
import { HotelService } from '../hoteles/hotel.service';
import {
  CreateHabitacionDto,
  UpdateHabitacionDto,
} from './dtos/habitacion.dto';

@Injectable()
export class HabitacionService {
  constructor(
    private hotelService: HotelService,
    @InjectRepository(Habitacion)
    private habitacionModel: Repository<Habitacion>,
    @InjectRepository(TipoHabitacion)
    private tipoHabitacionModel: Repository<TipoHabitacion>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
    const habitaciones: Habitacion[] = await this.habitacionModel.find({
      relations: ['tipoHabitacion', 'servicios'],
      where: { hotel: hotelId },
    });
    return {
      status: StatusTypes.success,
      data: habitaciones,
    };
  }

  async findAllTipo(): Promise<IGenResp> {
    const tipoHabitaciones: TipoHabitacion[] =
      await this.tipoHabitacionModel.find();
    return {
      status: StatusTypes.success,
      data: tipoHabitaciones,
    };
  }

  async findOne(
    hotelId: number,
    id: number,
    relations: string[] = [],
  ): Promise<IGenResp> {
    relations.push('tipoHabitacion', 'servicios');
    const habitacion: Habitacion = await this.habitacionModel.findOne({
      relations,
      where: {
        hotel: hotelId,
        id,
      },
    });
    if (!habitacion) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'La habitacion no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [habitacion],
    };
  }

  async create(
    hotelId: number,
    newData: CreateHabitacionDto,
  ): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    const tipoHabitacion: TipoHabitacion =
      await this.tipoHabitacionModel.findOne({
        where: { id: newData.tipoHabitacionId },
      });
    if (!hotel || !tipoHabitacion) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o el TipoHabitacion no existen',
      });
    } else {
      try {
        const nextId = await this.findNextId(hotelId);
        const newHabitacion = await this.habitacionModel.save({
          ...newData,
          id: nextId,
          hotel,
          tipoHabitacion,
        });
        return {
          status: StatusTypes.success,
          data: [newHabitacion],
        };
      } catch (error) {
        throw new ConflictException({
          status: StatusTypes.error,
          error: error.detail,
        });
      }
    }
  }

  async update(
    hotelId: number,
    id: number,
    newData: UpdateHabitacionDto,
  ): Promise<IGenResp> {
    const habitacionResp: IGenResp = await this.findOne(hotelId, id, ['hotel']);
    let habitacion: Habitacion = habitacionResp.data[0];
    let tipoHabitacion: TipoHabitacion;
    if (newData.tipoHabitacionId) {
      tipoHabitacion = await this.tipoHabitacionModel.findOne(
        newData.tipoHabitacionId,
      );
      if (!tipoHabitacion) {
        throw new NotFoundException({
          status: StatusTypes.error,
          error: 'El TipoHabitacion no existe',
        });
      }
    }
    delete habitacion.servicios;
    habitacion = this.habitacionModel.merge(habitacion, newData, {
      tipoHabitacion: tipoHabitacion || habitacion.tipoHabitacion,
    });
    habitacion = await this.habitacionModel.save(habitacion);
    delete habitacion.hotel;
    return {
      status: StatusTypes.success,
      data: [habitacion],
    };
  }

  async setEstado(
    hotelId: number,
    id: number,
    newEstado: boolean,
  ): Promise<IGenResp> {
    const habitacionResp: IGenResp = await this.findOne(hotelId, id, ['hotel']);
    let habitacion: Habitacion = habitacionResp.data[0];
    delete habitacion.servicios;
    habitacion = await this.habitacionModel.save({
      ...habitacion,
      activo: newEstado,
    });
    delete habitacion.hotel;
    return {
      status: StatusTypes.success,
      data: [habitacion],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id, ['hotel']); //si falla salta una exception
    try {
      await this.habitacionModel.delete({
        hotel: { id: hotelId },
        id,
      });
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
    const entity = await this.habitacionModel.find({
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
