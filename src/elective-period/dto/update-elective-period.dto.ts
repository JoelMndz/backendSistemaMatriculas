import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateElectivePeriodDto } from './create-elective-period.dto';
import { IsString } from 'class-validator';

export class UpdateElectivePeriodDto extends PartialType(CreateElectivePeriodDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
