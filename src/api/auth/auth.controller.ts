import { IUsuario } from './../usuarios/usuario.interface';
import { StatusTypes } from './../../helpers/generic.response';
import { Controller, UseGuards, Post, Request, HttpCode } from '@nestjs/common';

import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './../../decorators/public.decorator';

interface RequestWithUser extends Request {
  user: IUsuario;
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    return await this.authService.login(req.user);
  }
}
