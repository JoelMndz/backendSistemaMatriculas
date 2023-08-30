import { PartialType } from '@nestjs/swagger';
import { CreateParallelDto } from './create-parallel.dto';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateParallelDto extends PartialType(CreateParallelDto) {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quotas: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    _grade: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    _professor: string
}
