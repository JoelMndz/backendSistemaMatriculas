import { PartialType } from '@nestjs/swagger';
import { CreateParallelDto } from './create-parallel.dto';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator'
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
    @IsOptional()
    _grade: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    _professor: string
}
