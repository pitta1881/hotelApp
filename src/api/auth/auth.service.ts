import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { IJwtPayload } from './jwtPayload.interface';
import { Usuario } from './../../db/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(nick: string, password: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosService.findByNick(nick);
    if (usuario) {
      const passVerified = await bcrypt.compare(password, usuario.password);
      if (passVerified) {
        delete usuario.password;
        return usuario;
      }
    }
  }

  async login(user: IJwtPayload) {
    const payload = {
      id: user.id,
      nick: user.nick,
      hotelId: user.hotelId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
