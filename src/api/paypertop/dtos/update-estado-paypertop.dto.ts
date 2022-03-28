import { IsBoolean, IsDefined } from 'class-validator';

export class UpdateEstadoPaypertopDto {
  @IsBoolean()
  @IsDefined()
  activo: boolean;
}
