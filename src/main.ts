import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  await app.listen(configService.get('NESTJS_PORT'));
  console.log(`Hotel App is running on: ${await app.getUrl()}`);
  console.log(
    `Hotel App is connected to DB at port: ${configService.get('DB_PORT')}`,
  );
}
bootstrap();
