import { Module } from '@nestjs/common';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';

@Module({
  controllers: [HotelesController],
  providers: [HotelesService],
})
export class HotelesModule {}
