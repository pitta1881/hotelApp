import { IHotel } from './hotel.interface';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { Public } from 'src/decorators/public.decorator';
import { JoiValidationPipe } from 'src/middleware/joi-validation.pipe';
import { getHotelSchema, createHotelSchema } from './hoteles.schemas';
import { HotelesService } from './hoteles.service';

@Controller('api')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @Public()
  @Get('/hotel/:id')
  async findOne(
    @Param(new JoiValidationPipe(getHotelSchema)) { id }: { id: number },
  ) {
    return await this.hotelesService.findOne(id);
  }

  @Post('/hotel')
  async create(@Body(new JoiValidationPipe(createHotelSchema)) data: IHotel) {
    return await this.hotelesService.create(data);
  }
}
