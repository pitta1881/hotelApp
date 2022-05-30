import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Huesped } from './../../db/entities/husped.entity';
import { HuespedController } from './huesped.controller';
import { HuespedService } from './huesped.service';

@Module({
  imports: [TypeOrmModule.forFeature([Huesped])],
  controllers: [HuespedController],
  providers: [HuespedService],
  exports: [HuespedService],
})
export class HuespedModule {}
