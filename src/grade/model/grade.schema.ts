import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class GradeModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  subjects: string[];
}

export const GradeSchema = SchemaFactory.createForClass(GradeModel);
