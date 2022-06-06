import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

import { Paypertop } from './../../../db/entities/paypertop.entity';

export class CreatePaypertopDto {
  @IsString()
  @ValidateIf((paypertop: Paypertop) => paypertop.titular !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  titular?: string | null;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  razon_social: string;

  @IsEmail()
  @ValidateIf((paypertop: Paypertop) => paypertop.email !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  email?: string | null;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion: string;

  @IsString()
  @ValidateIf((paypertop: Paypertop) => paypertop.url !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  url?: string | null;

  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsDefined()
  abono_mensual: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  tipoPPTId: number;
}

export class UpdatePaypertopDto extends PartialType(CreatePaypertopDto) {}
