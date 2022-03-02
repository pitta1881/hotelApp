import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService {
  constructor(private config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get('JWT_SECRET'),
      signOptions: { expiresIn: `${this.config.get('JWT_EXPIRATION_TIME')}s` },
    };
  }
}
