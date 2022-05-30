import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsPositive } from 'class-validator';

export class AssociateServicioDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  habitacionId: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  servicioId: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsDefined()
  operacion: boolean;
}
