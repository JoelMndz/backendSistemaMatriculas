import { Body, Controller, Delete, Get, Post, UseGuards, Param, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Modulo estudiante')
@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService
  ){}

  @Get('get-all')
  getAll(){
    return this.studentService.getAll()
  }

  @Post('create')
  create(@Body() createDto: CreateStudentDto){
    return this.studentService.create(createDto)
  }

  @Delete('delete/:id')
  delete(@Param('id') id:string){
    return this.studentService.delete(id)
  }

  @Patch('update')
  update(@Body() updateDto:UpdateStudentDto){
    return this.studentService.update(updateDto)
  }
}
