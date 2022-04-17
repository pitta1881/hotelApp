import { Module } from '@nestjs/common';

import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [FrontendModule, BackendModule],
})
export class WebModule {}
