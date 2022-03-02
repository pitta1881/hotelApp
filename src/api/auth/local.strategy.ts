import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { IGenericResponse } from './../../helpers/generic.response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nick',
    });
  }

  async validate(nick: string, password: string): Promise<IGenericResponse> {
    const usuario = await this.authService.validateUser(nick, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
