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
import { IUsuario } from './usuario.interface';
import { Usuario } from './../../db/entities/usuario.entity';
import { Hotel } from 'src/db/entities/hotel.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
    @InjectRepository(Hotel)
    private hotelModel: Repository<Hotel>,
  ) {}

  async findAll(): Promise<IGenericResponse> {
    const usuarios: Usuario[] = await this.usuarioModel.find({
      relations: ['hotel'],
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
      relations: ['hotel'],
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

  async create(data: IUsuario): Promise<IGenericResponse> {
    const hash = await bcrypt.hash(data.password, 10);
    let newUser: Usuario;
    const hotel: Hotel = await this.hotelModel.findOne({
      where: { id: data.hotelId },
    });
    if (hotel) {
      try {
        newUser = await this.usuarioModel.save({
          ...data,
          password: hash,
        });
      } catch (error) {
        throw new ConflictException({
          status: StatusTypes.error,
          error: error.detail,
        });
      }
      delete newUser.password;
    }
    return {
      status: StatusTypes.success,
      data: [newUser],
    };
  }

  async update(id: number, newData: IUsuario): Promise<IGenericResponse> {
    const usuario: IGenericResponse = await this.findOne(id);
    const userModel: Usuario = usuario.data[0];
    if (usuario.status === 'SUCCESS') {
      await this.usuarioModel.update(id, newData);
    } else {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El usuario no existe',
      });
    }
    delete userModel.password;
    delete userModel.created_at;
    delete userModel.updated_at;
    return {
      status: StatusTypes.success,
      data: [{ ...userModel, ...newData }],
    };
  }

  async delete(id: number): Promise<IGenericResponse> {
    const usuario: IGenericResponse = await this.findOne(id);
    if (usuario.status === 'SUCCESS') {
      await this.usuarioModel.delete(id);
    } else {
      throw new NotFoundException({
        status: StatusTypes.error,
        error: 'El usuario no existe',
      });
    }
    return {
      status: StatusTypes.success,
    };
  }

  async findByNick(nick: string): Promise<IGenericResponse> {
    const usuario: Usuario = await this.usuarioModel.findOne({
      where: {
        nick,
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
}
