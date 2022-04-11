import { ApiModule } from './api/api.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as hbs from 'hbs';

import { HttpExceptionFilter } from './http-exception.filter';
import { ifEquals, greaterThan, jsonRaw } from './helpers/hbs-helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        //  enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const configService = app.get(ConfigService);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('HOTEL APP')
    .setDescription(
      '<p>Proyecto Final PAW UNLu - Pittavino Patricio</p><p>Si no es Public, el HotelId está en JWT</p>',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ApiModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  hbs.registerHelper('ifEquals', ifEquals);
  hbs.registerHelper('greaterThan', greaterThan);
  hbs.registerHelper('jsonRaw', jsonRaw);

  //app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get('NESTJS_PORT'));
  console.log(`Hotel App is running on: 
  web: ${await app.getUrl()}
  api: ${await app.getUrl()}/api
  apidoc: ${await app.getUrl()}/api/docs`);
  console.log(
    `Hotel App is connected to DB at port: ${configService.get('DB_PORT')}`,
  );
}
bootstrap();
