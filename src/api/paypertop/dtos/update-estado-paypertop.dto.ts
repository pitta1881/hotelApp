import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';

export class UpdateEstadoPaypertopDto {
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsDefined()
  activo: boolean;
}
