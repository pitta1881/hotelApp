import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { WebModule } from './web/web.module';
import { ApiModule } from './api/api.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [WebModule, ApiModule, MailModule],
  providers: [AppService],
})
export class AppModule {}
