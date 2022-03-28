import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateFotoHotelDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  path: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  tipoCarouselId: number;
}

export class UpdateFotoHotelDto extends PartialType(CreateFotoHotelDto) {}
