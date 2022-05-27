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
import { Habitacion } from './../../db/entities/habitacion.entity';
import { HotelService } from '../hoteles/hotel.service';
import { HabitacionService } from '../habitaciones/habitacion.service';
import { CreateServicioDto, UpdateServicioDto } from './dtos/servicio.dto';
import { AssociateServicioDto } from './dtos/associate-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    private hotelesService: HotelService,
    private habitacionService: HabitacionService,
    @InjectRepository(Servicio)
    private servicioModel: Repository<Servicio>,
  ) {}

  async findAllHotel(hotelId: number): Promise<IGenResp> {
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
    hotelId: number,
    habitacionId: number,
  ): Promise<IGenResp> {
    await this.habitacionService.findOne(hotelId, habitacionId); //verifico que exista la habitacion
    let servicios: Servicio[] = await this.servicioModel.find({
      relations: ['habitaciones'],
      where: {
        hotel: hotelId,
      },
    });
    servicios = servicios
      .filter((servicio) =>
        servicio.habitaciones.some(
          (habitacion) => habitacion.id === habitacionId,
        ),
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

  async findAllHabitacionNotIn(
    hotelId: number,
    habitacionId: number,
  ): Promise<IGenResp> {
    await this.habitacionService.findOne(hotelId, habitacionId); //verifico que exista la habitacion
    let servicios: Servicio[] = await this.servicioModel.find({
      relations: ['habitaciones'],
      where: {
        hotel: hotelId,
        servInstal: false,
      },
    });
    servicios = servicios
      .filter(
        (servicio) =>
          !servicio.habitaciones.some(
            (habitacion) => habitacion.id === habitacionId,
          ),
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

  async manageServicioHabitacion(
    hotelId: number,
    { servicioId, habitacionId, operacion }: AssociateServicioDto,
  ): Promise<IGenResp> {
    const servicioResp: IGenResp = await this.findOne(hotelId, servicioId);
    const servicio: Servicio = servicioResp.data[0];
    const habitacionResp: IGenResp = await this.habitacionService.findOne(
      hotelId,
      habitacionId,
    );
    const habitacion: Habitacion = habitacionResp.data[0];
    try {
      let habitaciones: Habitacion[] = servicio.habitaciones;
      //desasignar servicio
      if (operacion === false) {
        habitaciones = servicio.habitaciones.filter((habitacion) => {
          return habitacion.id !== habitacionId;
        });
      } else {
        habitaciones.push(habitacion);
      }
      //guardar relacion, ya sea asignar o desasignar
      const newAssociation = await this.servicioModel.save({
        ...servicio,
        habitaciones: [...habitaciones],
      });
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
