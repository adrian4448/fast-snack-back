import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Foods } from 'src/foods/interfaces/foods.schema';
import { StatusEnum } from './enums/demand.status.enum';

export type DemandDocument = Demand & Document;

@Schema()
export class Demand {
  @Prop()
  table: number;
  @Prop()
  foods: Array<Foods>;
  @Prop()
  status: StatusEnum;
}

export const DemandSchema = SchemaFactory.createForClass(Demand);
