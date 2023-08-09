import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchoolTermService } from './school-term.service';
import { CreateSchoolTermDto } from './dto/create-school-term.dto';
import { UpdateSchoolTermDto } from './dto/update-school-term.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('School Term')
@Controller('school-term')
export class SchoolTermController {
  constructor(private readonly schoolTermService: SchoolTermService) {}

  @Post()
  create(@Body() createSchoolTermDto: CreateSchoolTermDto) {
    return this.schoolTermService.create(createSchoolTermDto);
  }

  @Get()
  findAll() {
    return this.schoolTermService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolTermService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolTermDto: UpdateSchoolTermDto) {
    return this.schoolTermService.update(id, updateSchoolTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolTermService.remove(id);
  }
}
