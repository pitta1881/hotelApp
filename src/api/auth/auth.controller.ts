import {
  Controller,
  UseGuards,
  Post,
  Request,
  HttpCode,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IJwtPayload } from './jwtPayload.interface';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './../../decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';

interface RequestWithUser extends Request {
  user: IJwtPayload;
}

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'LogIn - PÚBLICO' })
  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto, description: 'admin-hotelpato, admin123' })
  async login(@Request() req: RequestWithUser) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Verificar Token - PÚBLICO' })
  @HttpCode(200)
  @Public()
  @Post('verify-token')
  @ApiBody({ type: TokenDto })
  async verifyToken(@Body() tokenDTO: TokenDto) {
    return await this.authService.verifyToken(tokenDTO.token);
  }
}
