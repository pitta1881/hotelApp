import { IsDefined, IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  @IsDefined()
  token: string;
}
