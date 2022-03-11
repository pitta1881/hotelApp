import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Hotel } from './../../db/entities/hotel.entity';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelesController],
  providers: [HotelesService],
  exports: [HotelesService],
})
export class HotelesModule {}
