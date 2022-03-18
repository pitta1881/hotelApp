import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoHabitacion } from './../../db/entities/tipoHabitacion.entity';
import {
  IGenericResponse,
  StatusTypes,
} from './../../helpers/generic.response';
import { Hotel } from './../../db/entities/hotel.entity';
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelesService } from '../hoteles/hoteles.service';
import { CreateHabitacionDto } from './dtos/create-habitacion.dto';
import { UpdateHabitacionDto } from './dtos/update-habitacion.dto';

@Injectable()
export class HabitacionesService {
  constructor(
    private hotelesService: HotelesService,
    @InjectRepository(Habitacion)
    private habitacionModel: Repository<Habitacion>,
    @InjectRepository(TipoHabitacion)
    private tipoHabitacionModel: Repository<TipoHabitacion>,
  ) {}

  async findAll(hotelId: number): Promise<IGenericResponse> {
    const habitaciones: Habitacion[] = await this.habitacionModel.find({
      where: {
        hotel: hotelId,
      },
    });
    return {
      status: StatusTypes.success,
      data: habitaciones,
    };
  }

  async findOne(id: number, relations?: string[]): Promise<IGenericResponse> {
    let habitacion: Habitacion;
    if (relations) {
      habitacion = await this.habitacionModel.findOne({
        relations: relations,
        where: {
          id,
        },
      });
    } else {
      habitacion = await this.habitacionModel.findOne({
        where: {
          id,
        },
      });
    }
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
    newData: CreateHabitacionDto,
    hotelId: number,
  ): Promise<IGenericResponse> {
    const hotelResp: IGenericResponse = await this.hotelesService.findOne(
      hotelId,
    );
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
        const newHabitacion = await this.habitacionModel.save({
          ...newData,
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
    id: number,
    newData: UpdateHabitacionDto,
  ): Promise<IGenericResponse> {
    const habitacionResp: IGenericResponse = await this.findOne(id);
    let habitacion: Habitacion = habitacionResp.data[0];
    habitacion = await this.habitacionModel.save({
      ...habitacion,
      ...newData,
    });
    return {
      status: StatusTypes.success,
      data: [habitacion],
    };
  }

  async setEstado(id: number, newEstado: boolean): Promise<IGenericResponse> {
    const habitacionResp: IGenericResponse = await this.findOne(id);
    let habitacion: Habitacion = habitacionResp.data[0];
    habitacion = await this.habitacionModel.save({
      ...habitacion,
      ocupado: newEstado,
    });
    return {
      status: StatusTypes.success,
      data: [habitacion],
    };
  }

  async delete(id: number): Promise<IGenericResponse> {
    await this.findOne(id); //si falla salta una exception
    try {
      await this.habitacionModel.delete(id);
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
}
