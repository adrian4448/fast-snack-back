import { Food } from "src/foods/interfaces/foods.interface";

export interface Demand {
    table: number;
    foods: Array<Food>;
    status: StatusEnum;
}