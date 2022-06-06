import { PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  apellido: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nick: string;

  @Length(8, 50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
