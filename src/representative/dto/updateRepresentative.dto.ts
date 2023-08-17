import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBase64, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class UpdateRepresentativeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @ValidateNested()
  @Type(()=>FileBase64)
  @IsOptional()
  cedulaFile: FileBase64
}