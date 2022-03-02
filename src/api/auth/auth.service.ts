import { Usuario } from './../../db/entities/usuario.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

import {
  StatusTypes,
  IGenericResponse,
} from './../../helpers/generic.response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    nick: string,
    password: string,
  ): Promise<IGenericResponse> {
    try {
      const usuario = await this.usuariosService.findByNick(nick);
      await this.verifyPassword(password, usuario.data[0].password);
      delete usuario.data[0].password;
      return {
        status: StatusTypes.success,
        data: [usuario.data[0]],
      };
    } catch (error) {
      throw new BadRequestException({
        status: StatusTypes.error,
        error: 'Usuario y/o contraseña incorrectas.',
      });
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException({
        status: StatusTypes.error,
        error: 'Usuario y/o contraseña incorrectas.',
      });
    }
  }

  async login(user: Usuario) {
    const payload = { username: user.nick, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
