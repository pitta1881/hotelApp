import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsOptional()
  nombre_uri?: string;

  @IsString()
  @IsDefined()
  descripcion_home: string;

  @IsString()
  @IsDefined()
  descripcion_ubi: string;

  @IsString()
  @IsDefined()
  telefono_1: string;

  @IsString()
  @IsOptional()
  telefono_2?: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  direccion: string;

  @IsString()
  @IsDefined()
  logo_path: string;

  @IsString()
  @IsDefined()
  horario_contacto: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  twitter?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;
}

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}
