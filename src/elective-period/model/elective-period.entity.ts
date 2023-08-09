import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SchoolTerm {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const SchoolTermSchema = SchemaFactory.createForClass(SchoolTerm);
