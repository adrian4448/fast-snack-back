import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFoodDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  urlImage: string;
}
