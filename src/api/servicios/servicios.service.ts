import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  StatusTypes,
  IGenericResponse,
} from './../../helpers/generic.response';
import { Servicio } from './../../db/entities/servicio.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelesService } from '../hoteles/hoteles.service';
import { HabitacionesService } from '../habitaciones/habitaciones.service';
import { CreateServicioDto } from './dtos/create-servicio.dto';
import { AssociateServicioDto } from './dtos/associate-servicio.dto';
import { UpdateServicioDto } from './dtos/update-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    private hotelesService: HotelesService,
    private habitacionService: HabitacionesService,
    @InjectRepository(Servicio)
    private servicioModel: Repository<Servicio>,
  ) {}

  async findAllHotel(hotelId: number): Promise<IGenericResponse> {
    const servicios: Servicio[] = await this.servicioModel.find({
      where: {
        hotel: hotelId,
      },
    });
    return {
      status: StatusTypes.success,
      data: servicios,
    };
  }

  async findAllHabitacion(
    id: number,
    hotelId: number,
  ): Promise<IGenericResponse> {
    await this.habitacionService.findOne(id); //verifico que exista la habitacion
    let servicios: Servicio[] = await this.servicioModel.find({
      relations: ['habitaciones'],
      where: {
        hotel: hotelId,
      },
    });
    servicios = servicios
      .filter((servicio) =>
        servicio.habitaciones.some((habitacion) => habitacion.id === id),
      )
      .map((servicio) => {
        delete servicio.habitaciones;
        return servicio;
      });
    return {
      status: StatusTypes.success,
      data: servicios,
    };
  }

  async findOne(id: number): Promise<IGenericResponse> {
    const servicio: Servicio = await this.servicioModel.findOne({
      where: {
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
    newData: CreateServicioDto,
    hotelId: number,
  ): Promise<IGenericResponse> {
    const hotelResp: IGenericResponse = await this.hotelesService.findOne(
      hotelId,
    );
    const hotel: Hotel = hotelResp.data[0];
    try {
      const newServicio = await this.servicioModel.save({
        ...newData,
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

  async manageServicioHabitacion(
    { servicioId, habitacionId, operacion }: AssociateServicioDto,
    hotelId: number,
  ): Promise<IGenericResponse> {
    const servicio: Servicio = await this.servicioModel.findOne({
      relations: ['hotel', 'habitaciones'],
      where: { id: servicioId },
    });
    const habitacionResp: IGenericResponse =
      await this.habitacionService.findOne(habitacionId, ['hotel']);
    const habitacion: Habitacion = habitacionResp.data[0];
    if (!servicio || !habitacion) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El servicio o la habitacion no existen',
      });
    } else {
      if (servicio.hotel.id !== hotelId || habitacion.hotel.id !== hotelId) {
        throw new NotFoundException({
          status: StatusTypes.error,
          error: 'El hotel no tiene ese servicio u habitacion',
        });
      } else {
        try {
          //desasignar servicio
          let habitaciones: Habitacion[];
          if (operacion === false) {
            habitaciones = servicio.habitaciones.filter((habitacion) => {
              return habitacion.id !== habitacionId;
            });
          }
          delete habitacion.hotel;
          //guardar relacion, ya sea asignar o desasignar
          const newAssociation = await this.servicioModel.save({
            ...servicio,
            habitaciones: habitaciones || [
              ...servicio.habitaciones,
              habitacion,
            ],
          });
          delete newAssociation.hotel;
          return {
            status: StatusTypes.success,
            data: [newAssociation],
          };
        } catch (error) {
          throw new ConflictException({
            status: StatusTypes.error,
            error: error.detail,
          });
        }
      }
    }
  }

  async update(
    id: number,
    newData: UpdateServicioDto,
  ): Promise<IGenericResponse> {
    const servicioResp: IGenericResponse = await this.findOne(id);
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

  async delete(id: number): Promise<IGenericResponse> {
    await this.findOne(id); //si falla salta una exception
    try {
      await this.servicioModel.delete(id);
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
