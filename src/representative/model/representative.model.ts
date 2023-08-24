import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Representative{
  @Prop({required: true})
  fullName: string

  @Prop({required:true})
  cedula: string

  @Prop({required: true})
  email: string

  @Prop()
  imageCedulaUrl: string

  @Prop({required: true})
  birthDate: number

  @Prop({required:true})
  address: string

  @Prop({default: true})
  status: boolean
}

export const RepresentativeSchema = SchemaFactory.createForClass(Representative)