import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/types";

@Schema()
export class User{
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase:true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum:Role})
  role: string

  @Prop()
  code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);