import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsEmail, IsString, ValidateNested, IsDate, IsNumber, IsOptional } from 'class-validator';

export class FileBase64{
  @ApiProperty()
  @IsBase64()
  @IsNotEmpty()
  base64: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName: string  
}

export class UpdateStudentDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty()
  @IsNumber()
  birthDate: number

  @ApiProperty()
  @IsString()
  fatherName: string;

  @ApiProperty()
  @IsString()
  motherName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  disability: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  allergies: string;

  @ApiProperty()
  @ValidateNested()
  @Type(()=>FileBase64)
  @IsOptional()
  cedulaFile: FileBase64

  @ApiProperty()
  @ValidateNested()
  @Type(()=>FileBase64)
  @IsOptional()
  bulletinFile: FileBase64

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _representative1: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  _representative2: string
}