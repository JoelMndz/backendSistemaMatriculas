import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateEnrollmentDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _student: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _parallel: string
}
