import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('HOTEL APP')
    .setDescription(
      '<p>Proyecto Final PAW UNLu - Pittavino Patricio</p><p>Si no es Public, el HotelId está en JWT</p>',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('NESTJS_PORT'));
  console.log(`Hotel App is running on: ${await app.getUrl()}`);
  console.log(
    `Hotel App is connected to DB at port: ${configService.get('DB_PORT')}`,
  );
}
bootstrap();
