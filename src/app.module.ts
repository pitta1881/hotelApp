import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { WebModule } from './web/web.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [WebModule, ApiModule],
  providers: [AppService],
})
export class AppModule {}
