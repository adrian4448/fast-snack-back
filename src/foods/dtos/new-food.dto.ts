import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewFoodDto {
  @ApiProperty({
    type: String,
    description: 'Nome do alimento',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Descrição do alimento',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Preço do alimento',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    description: 'Categoria do alimento',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    type: String,
    description: 'URL da imagem do alimento',
  })
  @IsNotEmpty()
  @IsString()
  urlImage: string;
}
