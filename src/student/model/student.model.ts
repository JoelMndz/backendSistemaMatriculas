import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { Representative } from "src/representative/model/representative.model";

@Schema()
export class Student{
  @Prop({required: true})
  fullName: string

  @Prop({required:true})
  cedula: string

  @Prop({required: true})
  birthDate: number

  @Prop()
  fatherName: string

  @Prop()
  motherName: string

  @Prop({required:true})
  address: string

  @Prop()
  disability: string

  @Prop()
  allergies: string

  @Prop()
  cedulaImageUrl: string

  @Prop()
  bulletinImageUrl: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref:'Representative',
    required: true
  })
  _representative1: Representative

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref:'Representative',
    default: null
  })
  _representative2: Representative

  @Prop({default: true})
  status: boolean
}

export const StudentSchema = SchemaFactory.createForClass(Student)