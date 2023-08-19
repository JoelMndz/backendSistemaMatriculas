import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Professor {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  cedula: string;

  @Prop({ required: true })
  dateBirth: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  disability: string;

  @Prop()
  cv: string;

  @Prop({ default: true })
  status: boolean;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);