import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OfficeEnum } from '../interfaces/enums/users.office.enum';

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(OfficeEnum)
  office: OfficeEnum;
}
