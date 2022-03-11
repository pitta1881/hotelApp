import { IUsuario } from './../../usuarios/usuario.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

import { StatusTypes } from './../../../helpers/generic.response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nick',
    });
  }

  async validate(nick: string, password: string): Promise<IUsuario> {
    const usuario = await this.authService.validateUser(nick, password);
    if (!usuario) {
      throw new UnauthorizedException({
        status: StatusTypes.error,
        error: 'Usuario y/o contraseña incorrectas.',
      });
    }
    return { ...usuario, hotelId: usuario.hotel.id };
  }
}
