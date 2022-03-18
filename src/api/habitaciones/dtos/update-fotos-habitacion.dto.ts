import { IsOptional, IsString } from 'class-validator';

export class UpdateFotosHabitacionDto {
  @IsString()
  @IsOptional()
  descripcion?: string;
}
