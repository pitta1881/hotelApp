import { IsDefined, IsString, Length } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsDefined()
  oldPassword: string;

  @IsString()
  @Length(8, 50)
  @IsDefined()
  newPassword: string;

  @IsString()
  @Match('newPassword', {
    message: 'New Password and Repeat Password not match.',
  })
  @IsDefined()
  repeatPassword: string;
}
