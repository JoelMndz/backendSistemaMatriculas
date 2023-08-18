import {
  IsBase64,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
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
  @IsNumber()
  @Length(6, 10)
  cedula: number;

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
  addrres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disability: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => File)
  cv: File;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
