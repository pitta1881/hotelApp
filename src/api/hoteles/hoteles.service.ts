import { IHotel } from './hotel.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { Hotel } from './../../db/entities/hotel.entity';
import {
  IGenericResponse,
  StatusTypes,
} from './../../helpers/generic.response';

@Injectable()
export class HotelesService {
  constructor(
    @InjectRepository(Hotel)
    private hotelModel: Repository<Hotel>,
  ) {}

  async findOne(id: number): Promise<IGenericResponse> {
    const hotel: Hotel = await this.hotelModel.findOne({
      where: {
        id,
      },
    });
    if (!hotel) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El hotel no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [hotel],
    };
  }

  async create(data: IHotel): Promise<IGenericResponse> {
    let newHotel: Hotel;
    try {
      newHotel = await this.hotelModel.save(data);
    } catch (error) {
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
    return {
      status: StatusTypes.success,
      data: [newHotel],
    };
  }
}
