import { IsDefined, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  nick: string;

  @IsString()
  @IsDefined()
  password: string;
}
