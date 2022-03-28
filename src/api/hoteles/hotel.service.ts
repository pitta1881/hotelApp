import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { Hotel } from '../../db/entities/hotel.entity';
import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { CreateHotelDto, UpdateHotelDto } from './dtos/hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelModel: Repository<Hotel>,
  ) {}

  async findAll(): Promise<IGenResp> {
    const hoteles: Hotel[] = await this.hotelModel.find();
    return {
      status: StatusTypes.success,
      data: hoteles,
    };
  }

  async findOne(id: number): Promise<IGenResp> {
    const hotel: Hotel = await this.hotelModel.findOne(id);
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

  async findOneByNombreUri(nombre_uri: string): Promise<IGenResp> {
    const hotel: Hotel = await this.hotelModel.findOne({
      where: { nombre_uri },
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

  async create(newData: CreateHotelDto): Promise<IGenResp> {
    let newHotel = this.hotelModel.create({
      ...newData,
      lat_lng: [newData.latitude, newData.longitude],
    });
    try {
      newHotel = await this.hotelModel.save(newHotel);
      return {
        status: StatusTypes.success,
        data: [newHotel],
      };
    } catch (error) {
      console.log(error);
      throw new ConflictException({
        status: StatusTypes.error,
        error: error.detail,
      });
    }
  }

  async update(id: number, newData: UpdateHotelDto): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.findOne(id);
    let hotel: Hotel = hotelResp.data[0];
    hotel = await this.hotelModel.save({
      ...hotel,
      ...newData,
      lat_lng:
        newData.latitude && newData.longitude
          ? [newData.latitude, newData.longitude]
          : [hotel.lat_lng[0], hotel.lat_lng[1]],
    });
    return {
      status: StatusTypes.success,
      data: [hotel],
    };
  }
}
