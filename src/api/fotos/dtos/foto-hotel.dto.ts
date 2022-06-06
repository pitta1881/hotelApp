import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateFotoHotelDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion: string;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  tipoCarouselId: number;
}

export class UpdateFotoHotelDto extends PartialType(CreateFotoHotelDto) {}
