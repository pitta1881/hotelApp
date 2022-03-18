import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class GetFotosHabitacionDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsDefined()
  habitacionId: number;
}
