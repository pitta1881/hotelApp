import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  IGenericResponse,
  StatusTypes,
} from './../../helpers/generic.response';
import { Usuario } from './../../db/entities/usuario.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { HotelesService } from '../hoteles/hoteles.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private hotelService: HotelesService,
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
  ) {}

  async findAll(hotelId: number): Promise<IGenericResponse> {
    const usuarios: Usuario[] = await this.usuarioModel.find({
      where: { hotel: hotelId },
    });
    return {
      status: StatusTypes.success,
      data: usuarios,
    };
  }

  async findOne(id: number): Promise<IGenericResponse> {
    const usuario: Usuario = await this.usuarioModel.findOne({
      where: {
        id,
      },
    });
    if (!usuario) {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El usuario no existe',
      });
    }
    delete usuario.password;
    delete usuario.created_at;
    delete usuario.updated_at;
    return {
      status: StatusTypes.success,
      data: [usuario],
    };
  }

  async create(
    newData: CreateUsuarioDto,
    hotelId: number,
  ): Promise<IGenericResponse> {
    const hash = await bcrypt.hash(newData.password, 10);
    let newUser: Usuario;
    const hotelResp: IGenericResponse = await this.hotelService.findOne(
      hotelId,
    );
    const hotel: Hotel = hotelResp.data[0];
    try {
      newUser = await this.usuarioModel.save({
        ...newData,
        password: hash,
        hotel,
      });
      delete newUser.password;
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
    id: number,
    newData: UpdateUsuarioDto,
  ): Promise<IGenericResponse> {
    const usuarioResp: IGenericResponse = await this.findOne(id);
    let user: Usuario = usuarioResp.data[0];
    user = await this.usuarioModel.save({ ...user, ...newData });
    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    return {
      status: StatusTypes.success,
      data: [user],
    };
  }

  async delete(id: number): Promise<IGenericResponse> {
    await this.findOne(id); //si no lo encuentra salta una exception
    try {
      await this.usuarioModel.delete(id);
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
}
