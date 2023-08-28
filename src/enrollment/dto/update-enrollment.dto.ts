import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  date: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  endNote: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _student: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _parallel: string
}
