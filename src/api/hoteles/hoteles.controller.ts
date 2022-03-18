import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from './../../decorators/public.decorator';
import { CreateHotelesDto } from './dtos/create-hoteles.dto';
import { GetHotelesDto } from './dtos/get-hoteles.dto';
import { HotelesService } from './hoteles.service';

@ApiTags('Hoteles')
@ApiBearerAuth()
@Controller('api/hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @ApiOperation({ summary: 'FindOne Hotel - PÚBLICO' })
  @Public()
  @Get(':id')
  async findOne(@Param() { id }: GetHotelesDto) {
    return await this.hotelesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create Hotel' })
  @Post()
  async create(@Body() data: CreateHotelesDto) {
    return await this.hotelesService.create(data);
  }
}
