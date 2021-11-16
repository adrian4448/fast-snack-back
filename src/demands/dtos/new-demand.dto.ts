import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { FoodDto } from '../../foods/dtos/food.dto';

export class NewDemandDto {
  @IsNotEmpty()
  @IsString()
  table: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  foods: Array<FoodDto>;
}
