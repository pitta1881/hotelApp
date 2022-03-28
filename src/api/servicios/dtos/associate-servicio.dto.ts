import { IsBoolean, IsDefined, IsInt, IsPositive } from 'class-validator';

export class AssociateServicioDto {
  @IsInt()
  @IsPositive()
  @IsDefined()
  habitacionId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  servicioId: number;

  @IsBoolean()
  @IsDefined()
  operacion: boolean;
}
