import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { IGenResp, StatusTypes } from '../../helpers/generic.response';
import { Usuario } from '../../db/entities/usuario.entity';
import { Hotel } from '../../db/entities/hotel.entity';
import { HotelService } from '../hoteles/hotel.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dtos/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    private hotelService: HotelService,
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
  ) {}

  async findAll(hotelId: number): Promise<IGenResp> {
    const usuarios: Usuario[] = await this.usuarioModel.find({
      where: { hotel: hotelId },
    });
    return {
      status: StatusTypes.success,
      data: usuarios,
    };
  }

  async findOne(hotelId: number, id: number): Promise<IGenResp> {
    const usuario: Usuario = await this.usuarioModel.findOne({
      relations: ['hotel'],
      where: {
        hotel: hotelId,
        id,
      },
    });
    if (!usuario) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El usuario no existe',
      });
    }
    return {
      status: StatusTypes.success,
      data: [usuario],
    };
  }

  async create(hotelId: number, newData: CreateUsuarioDto): Promise<IGenResp> {
    const hotelResp: IGenResp = await this.hotelService.findOne(hotelId);
    const hotel: Hotel = hotelResp.data[0];
    const nextId = await this.findNextId(hotelId);
    let newUser: Usuario = this.usuarioModel.create({
      hotel,
      ...newData,
      id: nextId,
    });
    try {
      newUser = await this.usuarioModel.save(newUser);
      return {
        status: StatusTypes.success,
        data: [newUser],
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
    id: number,
    newData: UpdateUsuarioDto,
  ): Promise<IGenResp> {
    const usuarioResp: IGenResp = await this.findOne(hotelId, id);
    let user: Usuario = usuarioResp.data[0];
    user = this.usuarioModel.merge(user, newData);
    user = await this.usuarioModel.save(user);
    return {
      status: StatusTypes.success,
      data: [user],
    };
  }

  async delete(hotelId: number, id: number): Promise<IGenResp> {
    await this.findOne(hotelId, id); //si falla salta una exception
    try {
      await this.usuarioModel.delete({
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

  //funcion solo para el auth
  async findByNick(nick: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({
      relations: ['hotel'],
      where: {
        nick,
      },
    });
  }

  private async findNextId(hotelId: number) {
    const entity = await this.usuarioModel.find({
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
