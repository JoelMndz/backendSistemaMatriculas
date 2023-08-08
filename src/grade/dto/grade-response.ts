import { ApiProperty } from '@nestjs/swagger';

export class GradeResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  grades: string[];
}

export class GradeResponseArray {
  @ApiProperty()
  grade: GradeResponse;
}
