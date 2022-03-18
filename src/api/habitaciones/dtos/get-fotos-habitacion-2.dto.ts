import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class GetFotosHabitacion2Dto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsDefined()
  habitacionId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsDefined()
  id: number;
}
