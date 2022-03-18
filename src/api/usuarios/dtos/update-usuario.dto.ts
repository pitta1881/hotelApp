import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nick?: string;

  @Length(8, 50)
  @IsOptional()
  password?: string;
}
