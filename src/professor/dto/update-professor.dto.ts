import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfessorDto } from './create-professor.dto';
import {
  IsBase64,
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
  @IsNotEmpty() 
  base64: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  cedula: string;

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
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disability: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => File)
  @IsOptional()
  cv: File;
}
