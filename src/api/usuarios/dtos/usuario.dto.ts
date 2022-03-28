import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  apellido: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  nick: string;

  @IsString()
  @Length(8, 50)
  @IsDefined()
  password: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
