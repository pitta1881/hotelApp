import { IsBoolean, IsDefined } from 'class-validator';

export class UpdateEstadoMensajeDto {
  @IsBoolean()
  @IsDefined()
  leido: boolean;
}
