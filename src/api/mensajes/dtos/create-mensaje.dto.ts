import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUppercase,
  Length,
  Min,
  MinDate,
} from 'class-validator';
import { IsDateGreaterThan } from '../../../decorators/IsGreaterThan.decorator';

export class CreateMensajeDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  apellido: string;

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

  @IsString()
  @Length(2, 2)
  @IsUppercase()
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
  @IsDefined()
  mensaje: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  hotelId: number;
}
