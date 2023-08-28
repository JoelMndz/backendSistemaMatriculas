import mongoose from "mongoose";
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Student } from "src/student/model/student.model";
import { Parallel } from "src/parallel/model/parallel.entity";

@Schema()
export class Enrollment {

  @Prop({ required: true })
  date: number;

  @Prop({ 
    required: true, 
    type: Number,
    min: 0,
    max: 10,
    get: (v: number) => parseFloat(v.toFixed(2))
  })
  endNote: number;

  @Prop({ 
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  })
  _student: Student;

  @Prop({ 
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parallel'
  })
  _parallel: Parallel;
}


export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
