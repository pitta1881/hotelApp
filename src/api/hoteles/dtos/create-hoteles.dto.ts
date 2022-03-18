import {
  IsDefined,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHotelesDto {
  @IsString()
  @IsDefined()
  nombre: string;

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

  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;
}
