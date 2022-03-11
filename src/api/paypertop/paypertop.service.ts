import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IPaypertop } from './paypertop.interface';
import { Hotel } from './../../db/entities/hotel.entity';
import { TipoPPT } from './../../db/entities/tipoPPT.entity';
import {
  IGenericResponse,
  StatusTypes,
} from './../../helpers/generic.response';
import { Paypertop } from './../../db/entities/paypertop.entity';
import { HotelesService } from '../hoteles/hoteles.service';
@Injectable()
export class PaypertopService {
  constructor(
    private hotelesService: HotelesService,
    @InjectRepository(Paypertop)
    private paypertopModel: Repository<Paypertop>,
    @InjectRepository(TipoPPT)
    private tipoPPTModel: Repository<TipoPPT>,
  ) {}

  async findAll(hotelId: number): Promise<IGenericResponse> {
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

  async findOne(id: number): Promise<IGenericResponse> {
    const paypertop: Paypertop = await this.paypertopModel.findOne({
      where: {
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

  async create(data: IPaypertop, hotelId: number): Promise<IGenericResponse> {
    const hotelResp: IGenericResponse = await this.hotelesService.findOne(
      hotelId,
    );
    const hotel: Hotel = hotelResp.data[0];
    const tipoPPT: TipoPPT = await this.tipoPPTModel.findOne({
      where: { id: data.tipoPPTId },
    });
    if (!hotel || !tipoPPT) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o el TipoPPT no existen',
      });
    } else {
      try {
        const newPaypertop = await this.paypertopModel.save({
          ...data,
          hotel,
          tipoPPT,
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

  async update(id: number, newData: IPaypertop): Promise<IGenericResponse> {
    const paypertopResp: IGenericResponse = await this.findOne(id);
    let paypertop: Paypertop = paypertopResp.data[0];
    paypertop = await this.paypertopModel.save({
      ...paypertop,
      newData,
    });
    return {
      status: StatusTypes.success,
      data: [paypertop],
    };
  }

  async setEstado(id: number, newEstado: boolean): Promise<IGenericResponse> {
    const paypertopResp: IGenericResponse = await this.findOne(id);
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

  async delete(id: number): Promise<IGenericResponse> {
    await this.findOne(id); //si falla salta una exception
    try {
      await this.paypertopModel.delete(id);
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
