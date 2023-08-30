import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from "class-validator";
import { Role } from "src/types";

export class CreateUserDto{
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
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role
}