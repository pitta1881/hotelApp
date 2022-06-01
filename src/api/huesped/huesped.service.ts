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

@Injectable()
export class HuespedService {
  constructor(
    @InjectRepository(Huesped)
    private huespedModel: Repository<Huesped>,
  ) {}

  async findAll(relations: string[] = []): Promise<IGenResp> {
    const huespedes: Huesped[] = await this.huespedModel.find({
      relations,
    });
    return {
      status: StatusTypes.success,
      data: huespedes,
    };
  }

  async findOne(id: number): Promise<IGenResp> {
    const huesped: Huesped = await this.huespedModel.findOne({
      relations: ['reservas'],
      where: {
        id,
      },
    });
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

  async update(id: number, newData: UpdateHuespedDto): Promise<IGenResp> {
    const huespedResp: IGenResp = await this.findOne(id);
    let huesped: Huesped = huespedResp.data[0];
    delete huesped.reservas;
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
