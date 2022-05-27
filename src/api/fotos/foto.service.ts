import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { HotelService } from '../hoteles/hotel.service';
import { FotoHotel } from '../../db/entities/fotoHotel.entity';
import { Hotel } from 'src/db/entities/hotel.entity';
import { TipoCarousel } from 'src/db/entities/tipoCarousel.entity';
import { CreateFotoHotelDto, UpdateFotoHotelDto } from './dtos/foto-hotel.dto';

@Injectable()
export class FotoService {
  constructor(
    private hotelService: HotelService,
    @InjectRepository(FotoHotel)
    private fotosHotelModel: Repository<FotoHotel>,
    @InjectRepository(TipoCarousel)
    private tipoCarouselModel: Repository<TipoCarousel>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
    const fotosHotel: FotoHotel[] = await this.fotosHotelModel.find({
      relations: ['tipoCarousel'],
      where: { hotel: hotelId },
    });
    return {
      status: StatusTypes.success,
      data: fotosHotel,
    };
  }

  async findAllTipo(): Promise<IGenResp> {
    const tipoHabitaciones: TipoCarousel[] =
      await this.tipoCarouselModel.find();
    return {
      status: StatusTypes.success,
      data: tipoHabitaciones,
    };
  }

  async findAllWithCarousel(
    hotelId: number,
    carouselId: number,
  ): Promise<IGenResp> {
    const tipoCarousel: TipoCarousel = await this.tipoCarouselModel.findOne(
      carouselId,
    );
    if (!tipoCarousel) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El TipoCarousel no existe',
      });
    }
    const fotosHotel: FotoHotel[] = await this.fotosHotelModel.find({
      relations: ['tipoCarousel'],
      where: {
        hotel: hotelId,
        tipoCarousel: {
          id: carouselId,
        },
      },
    });
    return {
      status: StatusTypes.success,
      data: fotosHotel,
    };
  }

  async findOne(hotelId: number, id: number): Promise<IGenResp> {
    const fotoHotel: FotoHotel = await this.fotosHotelModel.findOne({
      relations: ['tipoCarousel', 'hotel'],
      where: {
        hotel: hotelId,
        id,
      },
    });
    if (!fotoHotel) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'La Foto del hotel no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [fotoHotel],
    };
  }

  async create(
    hotelId: number,
    newData: CreateFotoHotelDto,
  ): Promise<IGenResp> {
    let newFotoHotel: FotoHotel;
    const hotelResp: IGenResp = await this.hotelService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    const tipoCarousel: TipoCarousel = await this.tipoCarouselModel.findOne(
      newData.tipoCarouselId,
    );
    if (!hotel || !tipoCarousel) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o el TipoCarousel no existen',
      });
    } else {
      try {
        const nextId = await this.findNextId(hotelId);
        newFotoHotel = await this.fotosHotelModel.save({
          hotel,
          tipoCarousel,
          ...newData,
          id: nextId,
        });
        return {
          status: StatusTypes.success,
          data: [newFotoHotel],
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
    newData: UpdateFotoHotelDto,
  ): Promise<IGenResp> {
    const fotoHotelResp: IGenResp = await this.findOne(hotelId, id);
    let fotoHotel: FotoHotel = fotoHotelResp.data[0];
    let tipoCarousel: TipoCarousel;
    if (newData.tipoCarouselId) {
      tipoCarousel = await this.tipoCarouselModel.findOne(
        newData.tipoCarouselId,
      );
      if (!tipoCarousel) {
        throw new NotFoundException({
          status: StatusTypes.error,
          error: 'El TipoCarousel no existe',
        });
      }
    }
    fotoHotel = this.fotosHotelModel.merge(fotoHotel, newData, {
      tipoCarousel: tipoCarousel || fotoHotel.tipoCarousel,
    });
    fotoHotel = await this.fotosHotelModel.save(fotoHotel);
    return {
      status: StatusTypes.success,
      data: [fotoHotel],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id); //si no lo encuentra salta una exception
    try {
      await this.fotosHotelModel.delete({
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
    const entity = await this.fotosHotelModel.find({
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
