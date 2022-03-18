import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateHabitacionDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion_hab?: string;

  @IsString()
  @IsOptional()
  descripcion_camas?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max_pax?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  tamanio_m2?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  tipoHabitacionId?: number;

  @IsBoolean()
  @IsOptional()
  ocupado?: boolean;
}
