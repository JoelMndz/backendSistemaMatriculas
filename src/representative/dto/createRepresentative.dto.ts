import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBase64, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

export class CreateRepresentativeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @ValidateNested()
  @Type(()=>FileBase64)
  cedulaFile: FileBase64
}