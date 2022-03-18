import {
  IsDefined,
  IsEmail,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePaypertopDto {
  @IsString()
  @IsDefined()
  titular: string;

  @IsString()
  @IsDefined()
  razon_social: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  url: string;

  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;

  @IsNumber()
  @IsPositive()
  @IsDefined()
  abono_mensual: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  tipoPPTId: number;
}
