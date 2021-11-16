import { IsNotEmpty, IsString } from 'class-validator';
import { FoodDto } from '../../foods/dtos/food.dto';
import { StatusEnum } from '../interfaces/enums/demand.status.enum';

export class NewDemandDto {
  @IsNotEmpty()
  @IsString()
  table: string;

  @IsNotEmpty()
  foods: Array<FoodDto>;

  @IsNotEmpty()
  status: StatusEnum;
}
