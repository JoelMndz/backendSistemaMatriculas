import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateSchoolTermDto } from './create-school-term.dto';
import { IsString } from 'class-validator';


export class UpdateSchoolTermDto extends PartialType(CreateSchoolTermDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
