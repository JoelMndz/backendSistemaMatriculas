import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGradeDto } from './create-grade.dto';
import { IsArray, IsString } from 'class-validator';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  grades: string[];
}
