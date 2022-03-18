import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdatePaypertopDto {
  @IsString()
  @IsOptional()
  titular?: string;

  @IsString()
  @IsOptional()
  razon_social?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  abono_mensual?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  tipoPPTId?: number;
}
