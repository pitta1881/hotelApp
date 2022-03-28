import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PaypertopController } from './paypertop.controller';
import { PaypertopService } from './paypertop.service';
import { TipoPPT } from './../../db/entities/tipoPPT.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { Paypertop } from './../../db/entities/paypertop.entity';
import { HotelModule } from '../hoteles/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Paypertop, Hotel, TipoPPT]), HotelModule],
  controllers: [PaypertopController],
  providers: [PaypertopService],
})
export class PaypertopModule {}
