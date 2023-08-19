import {
  IsBase64,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

export class CreateProfessorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 10)
  cedula: string;

  @ApiProperty()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  disability: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => File)
  cv: File;
}
