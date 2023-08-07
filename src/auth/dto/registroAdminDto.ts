import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class RegisterAdminDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName:string;

  @ApiProperty()
  @IsEmail()
  email:string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string
}