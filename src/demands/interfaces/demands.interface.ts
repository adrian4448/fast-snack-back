import { Food } from 'src/foods/interfaces/foods.interface';
import { StatusEnum } from './enums/demand.status.enum';

export interface Demand {
  table: number;
  foods: Array<Food>;
  status: StatusEnum;
}
