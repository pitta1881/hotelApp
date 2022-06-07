import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateHabitacionDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion_hab: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion_camas: string;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  max_pax: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  tamanio_m2: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  tipoHabitacionId: number;
}

export class UpdateHabitacionDto extends PartialType(CreateHabitacionDto) {}
