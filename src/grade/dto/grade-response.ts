import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class GradeResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsArray()
  subjects: string[];
}

export class GradeResponseArray {
  @ApiProperty()
  subjects: GradeResponse;
}
