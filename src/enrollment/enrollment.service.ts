import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './model/enrollment.entity';
import { Model } from 'mongoose';
import { Parallel } from 'src/parallel/model/parallel.entity';
import { Student } from 'src/student/model/student.model';

@Injectable()
export class EnrollmentService {
  
  constructor(
    @InjectModel(Enrollment.name) private readonly modelEnrollment: Model<Enrollment>,
    @InjectModel(Parallel.name) private readonly modeloParallel: Model<Parallel>,
    @InjectModel(Student.name) private readonly modelStudent: Model<Student>
    ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { _parallel, _student, date, endNote } = createEnrollmentDto

    const parallel = await this.modeloParallel.findById(_parallel);
    if(!parallel){
      throw new NotFoundException('No se encontro el paralelo');
    }

    const student = await this.modelStudent.findById(_student);
    if(!student){
      throw new NotFoundException('No se encontro el estudiante');
    }

    return await  this.modelEnrollment.create({
      _parallel: _parallel,
      _student: _student,
      date: date,
      endNote: endNote
    })

  }

  async findAll() {
    return await this.modelEnrollment.find().populate('_student _parallel')
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    const { _parallel, _student, } = updateEnrollmentDto;

    const parallel = await this.modeloParallel.findById(_parallel);
    if(!parallel){
      throw new NotFoundException('No se encontro el paralelo');
    }

    const student = await this.modelStudent.findById(_student);
    if(!student){
      throw new NotFoundException('No se encontro el estudiante');
    }

    return await this.modelEnrollment.findByIdAndUpdate(id, updateEnrollmentDto)
  }

  async remove(id: string) {
    return await this.modelEnrollment.findByIdAndRemove(id)
  }
}
