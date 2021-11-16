import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OfficeEnum } from './enums/users.office.enum';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  office: OfficeEnum;
}

export const UserSchema = SchemaFactory.createForClass(Users);
