import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenericResponse, StatusTypes } from '../../helpers/generic.response';
import { HabitacionesService } from './habitaciones.service';
import { FotoHabitacion } from '../../db/entities/fotoHabitacion.entity';
import { Habitacion } from 'src/db/entities/habitacion.entity';
import { UpdateFotosHabitacionDto } from './dtos/update-fotos-habitacion.dto';
import { CreateFotosHabitacionDto } from './dtos/create-fotos-habitacion.dto';

@Injectable()
export class FotosHabitacionService {
  constructor(
    private habitacionService: HabitacionesService,
    @InjectRepository(FotoHabitacion)
    private fotosHabitacionModel: Repository<FotoHabitacion>,
  ) {}

  async findAll(habitacionId: number): Promise<IGenericResponse> {
    const fotosHabitacion: FotoHabitacion[] =
      await this.fotosHabitacionModel.find({
        where: { habitacion: habitacionId },
      });
    return {
      status: StatusTypes.success,
      data: fotosHabitacion,
    };
  }

  async findOne(habitacionId: number, id: number): Promise<IGenericResponse> {
    const fotoHabitacion: FotoHabitacion =
      await this.fotosHabitacionModel.findOne({
        where: {
          habitacion: habitacionId,
          id,
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
    newData: CreateFotosHabitacionDto,
    habitacionId: number,
  ): Promise<IGenericResponse> {
    let newFotoHabitacion: FotoHabitacion;
    const habitacionResp: IGenericResponse =
      await this.habitacionService.findOne(habitacionId);
    const habitacion: Habitacion = habitacionResp.data[0];
    try {
      newFotoHabitacion = await this.fotosHabitacionModel.save({
        ...newData,
        habitacion,
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
    habitacionId: number,
    id: number,
    newData: UpdateFotosHabitacionDto,
  ): Promise<IGenericResponse> {
    const FotoHabitacionResp: IGenericResponse = await this.findOne(
      habitacionId,
      id,
    );
    let fotoHabitacion: FotoHabitacion = FotoHabitacionResp.data[0];
    fotoHabitacion = await this.fotosHabitacionModel.save({
      ...fotoHabitacion,
      ...newData,
    });
    return {
      status: StatusTypes.success,
      data: [fotoHabitacion],
    };
  }

  async delete(habitacionId: number, id: number): Promise<IGenericResponse> {
    await this.findOne(habitacionId, id); //si no lo encuentra salta una exception
    try {
      await this.fotosHabitacionModel.delete(id);
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
