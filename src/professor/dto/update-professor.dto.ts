import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfessorDto } from './create-professor.dto';
import {
  IsBase64,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class File {
  @ApiProperty()
  @IsBase64()
  base64: string;

  @ApiProperty()
  @IsString()
  fileName: string;
}

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 10)
  @IsNumber()
  cedula: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  dateBirth: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addrres: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disability: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => File)
  @IsOptional()
  cv: File;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
