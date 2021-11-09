import { Foods } from 'src/foods/interfaces/foods.entity';
import { StatusEnum } from './enums/demand.status.enum';

export interface Demand {
  table: number;
  foods: Array<Foods>;
  status: StatusEnum;
}
