import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateFotoHotelDto {
  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  path: string;

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
