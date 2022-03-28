import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Hotel } from './../../db/entities/hotel.entity';
import { TipoPPT } from './../../db/entities/tipoPPT.entity';
import { IGenResp, StatusTypes } from './../../helpers/generic.response';
import { Paypertop } from './../../db/entities/paypertop.entity';
import { HotelService } from '../hoteles/hotel.service';
import { CreatePaypertopDto, UpdatePaypertopDto } from './dtos/paypertop.dto';
@Injectable()
export class PaypertopService {
  constructor(
    private hotelService: HotelService,
    @InjectRepository(Paypertop)
    private paypertopModel: Repository<Paypertop>,
    @InjectRepository(TipoPPT)
    private tipoPPTModel: Repository<TipoPPT>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
    const paypertops: Paypertop[] = await this.paypertopModel.find({
      where: {
        hotel: hotelId,
      },
    });
    return {
      status: StatusTypes.success,
      data: paypertops,
    };
  }

  async findOne(hotelId: number, id: number): Promise<IGenResp> {
    const paypertop: Paypertop = await this.paypertopModel.findOne({
      relations: ['hotel'],
      where: {
        hotel: hotelId,
        id,
      },
    });
    if (!paypertop) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El paypertop no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [paypertop],
    };
  }

  async create(
    hotelId: number,
    newData: CreatePaypertopDto,
  ): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    const tipoPPT: TipoPPT = await this.tipoPPTModel.findOne({
      where: { id: newData.tipoPPTId },
    });
    if (!hotel || !tipoPPT) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o el TipoPPT no existen',
      });
    } else {
      try {
        const lat_lng = [newData.latitude, newData.longitude];
        const nextId = await this.findNextId(hotelId);
        const newPaypertop = await this.paypertopModel.save({
          lat_lng,
          hotel,
          tipoPPT,
          ...newData,
          id: nextId,
        });
        return {
          status: StatusTypes.success,
          data: [newPaypertop],
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
    newData: UpdatePaypertopDto,
  ): Promise<IGenResp> {
    const paypertopResp: IGenResp = await this.findOne(hotelId, id);
    let paypertop: Paypertop = paypertopResp.data[0];
    let tipoPPT: TipoPPT;
    if (newData.tipoPPTId) {
      tipoPPT = await this.tipoPPTModel.findOne(newData.tipoPPTId);
      if (!tipoPPT) {
        throw new NotFoundException({
          status: StatusTypes.error,
          error: 'El TipoPPT no existe',
        });
      }
    }
    paypertop = this.paypertopModel.merge(paypertop, newData, {
      tipoPPT: tipoPPT || paypertop.tipoPPT,
      lat_lng:
        newData.latitude && newData.longitude
          ? [newData.latitude, newData.longitude]
          : [paypertop.lat_lng[0], paypertop.lat_lng[1]],
    });
    paypertop = await this.paypertopModel.save(paypertop);
    return {
      status: StatusTypes.success,
      data: [paypertop],
    };
  }

  async setEstado(
    hotelId: number,
    id: number,
    newEstado: boolean,
  ): Promise<IGenResp> {
    const paypertopResp: IGenResp = await this.findOne(hotelId, id);
    let paypertop: Paypertop = paypertopResp.data[0];
    paypertop = await this.paypertopModel.save({
      ...paypertop,
      activo: newEstado,
    });
    return {
      status: StatusTypes.success,
      data: [paypertop],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id); //si falla salta una exception
    try {
      await this.paypertopModel.delete({
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
    const entity = await this.paypertopModel.find({
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
