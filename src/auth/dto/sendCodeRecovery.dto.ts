import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty} from "class-validator";


export class SendCodeRecoveryDto{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email:string;
}