import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsPositive } from 'class-validator';

export class AssociateHuespedDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsDefined()
  reservaId: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsDefined()
  huespedId: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsDefined()
  operacion: boolean;
}
