import { IsBoolean, IsDefined } from 'class-validator';

export class UpdateEstadoHabitacionDto {
  @IsBoolean()
  @IsDefined()
  ocupado: boolean;
}
