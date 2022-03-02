import { Module } from '@nestjs/common';
import { PaypertopController } from './paypertop.controller';
import { PaypertopService } from './paypertop.service';

@Module({
  controllers: [PaypertopController],
  providers: [PaypertopService]
})
export class PaypertopModule {}
