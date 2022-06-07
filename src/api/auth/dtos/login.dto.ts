import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nick: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
