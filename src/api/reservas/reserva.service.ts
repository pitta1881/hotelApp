import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { Reserva } from '../../db/entities/reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from './dtos/reserva.dto';
import { HabitacionService } from '../habitaciones/habitacion.service';
import { AssociateHuespedDto } from './dtos/associate-huesped.dto';
import { Huesped } from './../../db/entities/husped.entity';
import { HuespedService } from './../huesped/huesped.service';
import { Hotel } from './../../db/entities/hotel.entity';
import { HotelService } from './../hoteles/hotel.service';
import { Habitacion } from './../../db/entities/habitacion.entity';

@Injectable()
export class ReservaService {
  constructor(
    private hotelService: HotelService,
    private habitacionService: HabitacionService,
    private huespedesService: HuespedService,
    @InjectRepository(Reserva)
    private reservaModel: Repository<Reserva>,
  ) {}

  async findAll(
    hotelId: number,
    skip?: number,
    limit?: number,
  ): Promise<IGenResp> {
    const [reservas, total]: [reservas: Reserva[], total: number] =
      await this.reservaModel.findAndCount({
        relations: ['habitacion', 'huespedes'],
        where: {
          hotel: hotelId,
        },
        skip,
        take: limit,
      });
    return {
      status: StatusTypes.success,
      total,
      data: reservas,
    };
  }

  async findOne(
    hotelId: number,
    id: number,
    relations: string[] = [],
  ): Promise<IGenResp> {
    relations.push('habitacion', 'huespedes');
    const reserva: Reserva = await this.reservaModel.findOne({
      relations,
      where: {
        id,
        hotel: hotelId,
      },
    });
    if (!reserva) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'La Reserva de la habitacion no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [reserva],
    };
  }

  async findAllHuespedes(
    hotelId: number,
    reservaId: number,
  ): Promise<IGenResp> {
    await this.findOne(hotelId, reservaId); //verifico que exista la habitacion
    const huespedesResp: IGenResp = await this.huespedesService.findAll([
      'reservas',
    ]);
    let huespedes: Huesped[] = huespedesResp.data;
    huespedes = huespedes
      .filter((huesped) =>
        huesped.reservas.some((reserva) => reserva.id === reservaId),
      )
      .map((huesped) => {
        delete huesped.reservas;
        return huesped;
      });
    return {
      status: StatusTypes.success,
      data: huespedes,
    };
  }

  async findAllHuespedesNotIn(
    hotelId: number,
    reservaId: number,
  ): Promise<IGenResp> {
    await this.findOne(hotelId, reservaId); //verifico que exista la habitacion
    const huespedesResp: IGenResp = await this.huespedesService.findAll([
      'reservas',
    ]);
    let huespedes: Huesped[] = huespedesResp.data;
    huespedes = huespedes
      .filter(
        (huesped) =>
          !huesped.reservas.some((reserva) => reserva.id === reservaId),
      )
      .map((huesped) => {
        delete huesped.reservas;
        return huesped;
      });
    return {
      status: StatusTypes.success,
      data: huespedes,
    };
  }

  async manageHuespedReserva(
    hotelId: number,
    { huespedId, reservaId, operacion }: AssociateHuespedDto,
  ): Promise<IGenResp> {
    const reservaResp: IGenResp = await this.findOne(hotelId, reservaId, [
      'hotel',
    ]);
    const reserva: Reserva = reservaResp.data[0];
    if (operacion && reserva.huespedes.length >= reserva.habitacion.max_pax) {
      throw new ForbiddenException({
        status: StatusTypes.error,
        error: `Máximo de Huespedes para ésta habitación alcanzados. (MAX.: ${reserva.habitacion.max_pax})`,
      });
    }
    const huespedResp: IGenResp = await this.huespedesService.findOne(
      huespedId,
    );
    const huesped: Huesped = huespedResp.data[0];
    let huespedesNew: Huesped[] = reserva.huespedes;
    try {
      //desasignar servicio
      if (operacion === false) {
        huespedesNew = reserva.huespedes.filter((huesped) => {
          return huesped.id !== huespedId;
        });
      } else {
        huespedesNew.push(huesped);
      }
      //guardar relacion, ya sea asignar o desasignar
      const newAssociation = await this.reservaModel.save({
        ...reserva,
        huespedes: huespedesNew,
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

  async create(hotelId: number, newData: CreateReservaDto): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    const habitacionResp: IGenResp = await this.habitacionService.findOne(
      hotelId,
      newData.habitacionId,
    );
    const habitacion: Habitacion = habitacionResp.data[0];
    if (!hotel || !habitacion) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o la Habitación no existen',
      });
    } else {
      try {
        const nextId = await this.findNextId(hotelId);
        const newReserva = await this.reservaModel.save({
          ...newData,
          id: nextId,
          hotel,
          habitacion,
        });
        delete newReserva.hotel;
        return {
          status: StatusTypes.success,
          data: [newReserva],
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
    newData: UpdateReservaDto,
  ): Promise<IGenResp> {
    const reservaResp: IGenResp = await this.findOne(hotelId, id, ['hotel']);
    let reserva: Reserva = reservaResp.data[0];
    if (
      newData.monto_pagado > 0 &&
      newData.monto_pagado > reserva.monto_final
    ) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: 'El Monto Pagado no puede ser mayor al Monto Final',
      });
    }
    let habitacionResp: IGenResp;
    let habitacion: Habitacion;
    if (newData.habitacionId) {
      habitacionResp = await this.habitacionService.findOne(
        hotelId,
        newData.habitacionId,
      );
      habitacion = habitacionResp.data[0];
      if (!habitacion) {
        throw new NotFoundException({
          status: StatusTypes.error,
          error: 'La Habitación no existe',
        });
      }
    }
    delete reserva.huespedes;
    reserva = this.reservaModel.merge(reserva, newData, {
      habitacion: habitacion || reserva.habitacion,
    });
    reserva = await this.reservaModel.save(reserva);
    delete reserva.habitacion;
    delete reserva.hotel;
    return {
      status: StatusTypes.success,
      data: [reserva],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id); //si no lo encuentra salta una exception
    try {
      await this.reservaModel.delete({
        hotel: {
          id: hotelId,
        },
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
    const entity = await this.reservaModel.find({
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
