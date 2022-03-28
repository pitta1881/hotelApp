import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { HabitacionService } from './habitacion.service';
import { FotoHabitacion } from '../../db/entities/fotoHabitacion.entity';
import { Habitacion } from '../../db/entities/habitacion.entity';
import {
  CreateFotoHabitacionDto,
  UpdateFotoHabitacionDto,
} from './dtos/foto-habitacion.dto';

@Injectable()
export class FotoHabitacionService {
  constructor(
    private habitacionService: HabitacionService,
    @InjectRepository(FotoHabitacion)
    private fotoHabitacionModel: Repository<FotoHabitacion>,
  ) {}

  async findAll(hotelId: number, habitacionId: number): Promise<IGenResp> {
    const fotosHabitacion: FotoHabitacion[] =
      await this.fotoHabitacionModel.find({
        where: {
          habitacion: {
            id: habitacionId,
            hotel: hotelId,
          },
        },
      });
    return {
      status: StatusTypes.success,
      data: fotosHabitacion,
    };
  }

  async findOne(
    hotelId: number,
    habitacionId: number,
    id: number,
  ): Promise<IGenResp> {
    const fotoHabitacion: FotoHabitacion =
      await this.fotoHabitacionModel.findOne({
        relations: ['habitacion'],
        where: {
          id,
          habitacion: {
            id: habitacionId,
            hotel: hotelId,
          },
        },
      });
    if (!fotoHabitacion) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'La Foto de la habitacion no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [fotoHabitacion],
    };
  }

  async create(
    hotelId: number,
    habitacionId: number,
    newData: CreateFotoHabitacionDto,
  ): Promise<IGenResp> {
    let newFotoHabitacion: FotoHabitacion;
    const habitacionResp: IGenResp = await this.habitacionService.findOne(
      hotelId,
      habitacionId,
    );
    const habitacion: Habitacion = habitacionResp.data[0];
    try {
      const nextId = await this.findNextId(hotelId, habitacionId);
      newFotoHabitacion = await this.fotoHabitacionModel.save({
        habitacion,
        ...newData,
        id: nextId,
      });
      return {
        status: StatusTypes.success,
        data: [newFotoHabitacion],
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
    habitacionId: number,
    id: number,
    newData: UpdateFotoHabitacionDto,
  ): Promise<IGenResp> {
    const fotoHabitacionResp: IGenResp = await this.findOne(
      hotelId,
      habitacionId,
      id,
    );
    let fotoHabitacion: FotoHabitacion = fotoHabitacionResp.data[0];
    fotoHabitacion = await this.fotoHabitacionModel.save({
      ...fotoHabitacion,
      ...newData,
    });
    return {
      status: StatusTypes.success,
      data: [fotoHabitacion],
    };
  }

  async delete(
    hotelId: number,
    habitacionId: number,
    id: number,
  ): Promise<IGenResp> {
    await this.findOne(hotelId, habitacionId, id); //si no lo encuentra salta una exception
    try {
      await this.fotoHabitacionModel.delete({
        id,
        habitacion: {
          id: habitacionId,
          hotel: {
            id: hotelId,
          },
        },
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

  private async findNextId(hotelId: number, habitacionId: number) {
    const entity = await this.fotoHabitacionModel.find({
      relations: ['habitacion'],
      where: {
        habitacion: {
          id: habitacionId,
          hotel: hotelId,
        },
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });
    return entity.length === 0 ? 1 : entity[0].id + 1;
  }
}
