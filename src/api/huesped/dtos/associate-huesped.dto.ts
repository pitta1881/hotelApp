import { IsBoolean, IsDefined, IsInt, IsPositive } from 'class-validator';

export class AssociateHuespedDto {
  @IsInt()
  @IsPositive()
  @IsDefined()
  habitacionId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  reservaId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  huespedId: number;

  @IsBoolean()
  @IsDefined()
  operacion: boolean;
}
