import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { Public } from './../../decorators/public.decorator';
import { IHotel } from './hoteles.interface';
import { JoiValidationPipe } from './../../middleware/joi-validation.pipe';
import { getHotelSchema, createHotelSchema } from './hoteles.schemas';
import { HotelesService } from './hoteles.service';

@Controller('api/hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @Public()
  @Get(':id')
  async findOne(
    @Param(new JoiValidationPipe(getHotelSchema)) { id }: { id: number },
  ) {
    return await this.hotelesService.findOne(id);
  }

  @Post()
  async create(@Body(new JoiValidationPipe(createHotelSchema)) data: IHotel) {
    return await this.hotelesService.create(data);
  }
}
