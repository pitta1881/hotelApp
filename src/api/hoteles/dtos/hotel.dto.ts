import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  ValidateIf,
  IsNotEmpty,
  IsNotIn,
} from 'class-validator';

import { Hotel } from './../../../db/entities/hotel.entity';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  @IsNotIn(['css', 'js', 'public', 'uploads', 'fonts', 'icons', 'api'])
  @IsDefined()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion_home: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion_ubi: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  telefono_1: string;

  @IsString()
  @ValidateIf((hotel: Hotel) => hotel.telefono_2 !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  telefono_2?: string | null;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  horario_contacto: string;

  @IsString()
  @ValidateIf((hotel: Hotel) => hotel.facebook !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  facebook?: string | null;

  @IsString()
  @ValidateIf((hotel: Hotel) => hotel.twitter !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  twitter?: string | null;

  @IsString()
  @ValidateIf((hotel: Hotel) => hotel.instagram !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  instagram?: string | null;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  activo?: boolean = false;

  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;
}

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}
