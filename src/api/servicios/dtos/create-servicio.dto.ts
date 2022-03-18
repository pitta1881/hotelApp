import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsBoolean()
  @IsDefined()
  servInstal: boolean;

  @IsString()
  @IsDefined()
  icon_path: string;
}
