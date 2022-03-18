import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGenericResponse, StatusTypes } from '../../helpers/generic.response';
import { HotelesService } from '../hoteles/hoteles.service';
import { FotoHotel } from '../../db/entities/fotoHotel.entity';
import { Hotel } from 'src/db/entities/hotel.entity';
import { TipoCarousel } from 'src/db/entities/tipoCarousel.entity';
import { UpdateFotosHotelDto } from './dtos/update-fotos-hotel.dto';
import { CreateFotosHotelDto } from './dtos/create-fotos-hotel.dto';

@Injectable()
export class FotosService {
  constructor(
    private hotelService: HotelesService,
    @InjectRepository(FotoHotel)
    private fotosHotelModel: Repository<FotoHotel>,
    @InjectRepository(TipoCarousel)
    private tipoCarouselModel: Repository<TipoCarousel>,
  ) {}

  async findAll(hotelId: number): Promise<IGenericResponse> {
    const fotosHotel: FotoHotel[] = await this.fotosHotelModel.find({
      where: { hotel: hotelId },
    });
    return {
      status: StatusTypes.success,
      data: fotosHotel,
    };
  }

  async findOne(id: number): Promise<IGenericResponse> {
    const fotoHotel: FotoHotel = await this.fotosHotelModel.findOne({
      where: {
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
    newData: CreateFotosHotelDto,
    hotelId: number,
  ): Promise<IGenericResponse> {
    let newFotoHotel: FotoHotel;
    const hotelResp: IGenericResponse = await this.hotelService.findOne(
      hotelId,
    );
    const hotel: Hotel = hotelResp.data[0];
    const tipoCarousel: TipoCarousel = await this.tipoCarouselModel.findOne({
      where: { id: newData.tipoCarouselId },
    });
    if (!hotel || !tipoCarousel) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El Hotel o el TipoCarousel no existen',
      });
    } else {
      try {
        newFotoHotel = await this.fotosHotelModel.save({
          ...newData,
          hotel,
          tipoCarousel,
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
    id: number,
    newData: UpdateFotosHotelDto,
  ): Promise<IGenericResponse> {
    const fotoHotelResp: IGenericResponse = await this.findOne(id);
    let fotoHotel: FotoHotel = fotoHotelResp.data[0];
    fotoHotel = await this.fotosHotelModel.save({ ...fotoHotel, ...newData });
    return {
      status: StatusTypes.success,
      data: [fotoHotel],
    };
  }

  async delete(id: number): Promise<IGenericResponse> {
    await this.findOne(id); //si no lo encuentra salta una exception
    try {
      await this.fotosHotelModel.delete(id);
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
