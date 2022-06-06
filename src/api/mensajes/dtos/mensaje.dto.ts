import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  Min,
  MinDate,
} from 'class-validator';
import { IsDateGreaterThan } from '../../../decorators/IsGreaterThan.decorator';

export class CreateMensajeDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  hotel_nombre_uri: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @IsDefined()
  checkin: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsDateGreaterThan('checkin', {
    message: 'checkout must be greater than checkin',
  })
  @IsDefined()
  checkout: string;

  @Length(2, 2)
  @IsUppercase()
  @IsString()
  @IsDefined()
  pais: string;

  @IsInt()
  @Min(0)
  @IsDefined()
  adultos: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  menores?: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mensaje: string;
}
