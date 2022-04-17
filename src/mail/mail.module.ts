import { ConfigService, ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join, resolve } from 'path';
import { MailService } from './mail.service';
import { shortDate } from './../helpers/hbs-helpers';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST', { infer: true }),
          port: config.get('EMAIL_PORT', { infer: true }),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER', { infer: true }),
            pass: config.get('EMAIL_PASSWORD', { infer: true }),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('EMAIL_USER', { infer: true })}>`,
        },
        template: {
          dir: join(resolve(__dirname, '..'), 'views', 'email'),
          adapter: new HandlebarsAdapter({ shortDate }),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
