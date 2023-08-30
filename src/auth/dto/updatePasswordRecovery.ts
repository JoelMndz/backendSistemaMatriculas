import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class UpdatePasswordRecovery{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code:string;

  @ApiProperty()
  @IsEmail()
  email:string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string
}