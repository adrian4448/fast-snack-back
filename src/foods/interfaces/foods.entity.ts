import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FoodDocument = Foods & Document;

@Schema()
export class Foods {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  urlImage: string;
}

export const FoodsSchema = SchemaFactory.createForClass(Foods);
