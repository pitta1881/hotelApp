import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  oldPassword: string;

  @Length(8, 50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  newPassword: string;

  @IsString()
  @Match('newPassword', {
    message: 'New Password and Repeat Password not match.',
  })
  @IsDefined()
  repeatPassword: string;
}
