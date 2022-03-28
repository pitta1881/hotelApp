import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from './../../helpers/generic.response';
import { Huesped } from './../../db/entities/husped.entity';
import { CreateHuespedDto, UpdateHuespedDto } from './dtos/huesped.dto';
import { AssociateHuespedDto } from './dtos/associate-huesped.dto';
import { Reserva } from './../../db/entities/reserva.entity';
import { ReservaService } from '../reservas/reserva.service';
import { Reserva_x_Huesped } from './../../db/entities/reserva_x_husped.entity';

@Injectable()
export class HuespedService {
  constructor(
    private reservaService: ReservaService,
    @InjectRepository(Huesped)
    private huespedModel: Repository<Huesped>,
    @InjectRepository(Reserva_x_Huesped)
    private reserva_x_huespedModel: Repository<Reserva_x_Huesped>,
  ) {}

  async findAll(): Promise<IGenResp> {
    const huespedes: Huesped[] = await this.huespedModel.find();
    return {
      status: StatusTypes.success,
      data: huespedes,
    };
  }

  async findOne(id: number): Promise<IGenResp> {
    const huesped: Huesped = await this.huespedModel.findOne(id);
    if (!huesped) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El huesped no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [huesped],
    };
  }

  async create(newData: CreateHuespedDto): Promise<IGenResp> {
    let newHuesped: Huesped;
    try {
      newHuesped = await this.huespedModel.save({
        ...newData,
      });
      return {
        status: StatusTypes.success,
        data: [newHuesped],
      };
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  async manageHuespedReserva(
    hotelId: number,
    { huespedId, reservaId, habitacionId, operacion }: AssociateHuespedDto,
  ): Promise<IGenResp> {
    const huespedResp: IGenResp = await this.findOne(huespedId);
    const huesped: Huesped = huespedResp.data[0];
    const reservaResp: IGenResp = await this.reservaService.findOne(
      hotelId,
      habitacionId,
      reservaId,
    );
    const reserva: Reserva = reservaResp.data[0];
    try {
      //desasignar huesped
      if (operacion === false) {
        await this.reserva_x_huespedModel.delete({
          huesped,
          reserva,
        });
        return {
          status: StatusTypes.success,
        };
      } else {
        //asignar huesped
        const newAssociation: Reserva_x_Huesped =
          await this.reserva_x_huespedModel.save({
            huesped,
            reserva,
          });
        return {
          status: StatusTypes.success,
          data: [newAssociation],
        };
      }
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  async update(id: number, newData: UpdateHuespedDto): Promise<IGenResp> {
    const huespedResp: IGenResp = await this.findOne(id);
    let huesped: Huesped = huespedResp.data[0];
    huesped = await this.huespedModel.save({ ...huesped, ...newData });
    return {
      status: StatusTypes.success,
      data: [huesped],
    };
  }

  async delete(id: number): Promise<IGenResp> {
    await this.findOne(id); //si no lo encuentra salta una exception
    try {
      await this.huespedModel.delete(id);
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
