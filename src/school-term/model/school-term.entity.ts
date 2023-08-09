import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SchoolTerm {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  current: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SchoolTermSchema = SchemaFactory.createForClass(SchoolTerm);
