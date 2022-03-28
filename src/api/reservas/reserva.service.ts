import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { Reserva } from '../../db/entities/reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from './dtos/reserva.dto';
import { HabitacionService } from '../habitaciones/habitacion.service';

@Injectable()
export class ReservaService {
  constructor(
    private habitacionService: HabitacionService,
    @InjectRepository(Reserva)
    private reservaModel: Repository<Reserva>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
    const reservas: Reserva[] = await this.reservaModel.find({
      where: { hotelId },
    });
    return {
      status: StatusTypes.success,
      data: reservas,
    };
  }

  async findOne(
    hotelId: number,
    habitacionId: number,
    id: number,
  ): Promise<IGenResp> {
    const reserva: Reserva = await this.reservaModel.findOne({
      where: {
        habitacion: { id: habitacionId, hotel: { id: hotelId } },
        id,
      },
      relations: [
        'reserva_x_huesped',
        'reserva_x_huesped.huesped',
        'habitacion',
      ],
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

  async create(hotelId: number, newData: CreateReservaDto): Promise<IGenResp> {
    await this.habitacionService.findOne(hotelId, newData.habitacionId);
    try {
      const nextId = await this.findNextId(hotelId, newData.habitacionId);
      let newReserva: Reserva = this.reservaModel.create({
        hotelId,
        habitacionId: newData.habitacionId,
        ...newData,
        id: nextId,
      });
      console.log(newReserva);
      newReserva = await this.reservaModel.save(newReserva);
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

  async update(
    hotelId: number,
    habitacionId: number,
    id: number,
    newData: UpdateReservaDto,
  ): Promise<IGenResp> {
    const reservaResp: IGenResp = await this.findOne(hotelId, habitacionId, id);
    let reserva: Reserva = reservaResp.data[0];
    reserva = await this.reservaModel.save({
      hotelId,
      habitacionId,
      id,
      ...newData,
    });
    return {
      status: StatusTypes.success,
      data: [reserva],
    };
  }

  async delete(
    hotelId: number,
    habitacionId: number,
    id: number,
  ): Promise<IGenResp> {
    await this.findOne(hotelId, habitacionId, id); //si no lo encuentra salta una exception
    try {
      await this.reservaModel.delete({ hotelId, habitacionId, id });
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
    const entity = await this.reservaModel.find({
      where: {
        hotelId,
        habitacionId,
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });
    return entity.length === 0 ? 1 : entity[0].id + 1;
  }
}
