import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

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
}
