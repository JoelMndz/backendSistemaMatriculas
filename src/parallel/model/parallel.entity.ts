import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import mongoose from "mongoose";
import { GradeModel } from 'src/grade/model/grade.schema';
import { Professor } from 'src/professor/model/professor.entity'; 
import { SchoolTerm } from 'src/school-term/model/school-term.entity';

@Schema()
export class Parallel {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quotas: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GradeModel', required: true })
  _grade: GradeModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolTerm' })
  _schoolTerm: SchoolTerm;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true })
  _professor: Professor;
}

export const ParallelSchema = SchemaFactory.createForClass(Parallel)