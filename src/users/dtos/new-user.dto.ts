import { IsNotEmpty } from 'class-validator';
import { OfficeEnum } from '../interfaces/enums/users.office.enum';

export class NewUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  office: OfficeEnum;
}
