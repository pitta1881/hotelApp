import { IsDefined, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateHabitacionDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  descripcion_hab: string;

  @IsString()
  @IsDefined()
  descripcion_camas: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  max_pax: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  tamanio_m2: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  tipoHabitacionId: number;
}
