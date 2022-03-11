import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PaypertopController } from './paypertop.controller';
import { PaypertopService } from './paypertop.service';
import { TipoPPT } from './../../db/entities/tipoPPT.entity';
import { Hotel } from './../../db/entities/hotel.entity';
import { Paypertop } from './../../db/entities/paypertop.entity';
import { HotelesModule } from '../hoteles/hoteles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paypertop, Hotel, TipoPPT]),
    HotelesModule,
  ],
  controllers: [PaypertopController],
  providers: [PaypertopService],
})
export class PaypertopModule {}
