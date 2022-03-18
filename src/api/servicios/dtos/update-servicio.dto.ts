import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateServicioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  servInstal?: boolean;

  @IsString()
  @IsOptional()
  icon_path?: string;
}
