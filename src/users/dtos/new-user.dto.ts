import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OfficeEnum } from '../interfaces/enums/users.office.enum';

export class NewUserDto {
  @ApiProperty({
    type: String,
    description: 'Nome do usuario',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuario',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Email do usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Cargo do funcionario',
  })
  @IsNotEmpty()
  @IsEnum(OfficeEnum)
  office: OfficeEnum;
}
