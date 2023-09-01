import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './model/enrollment.entity';
import { Model } from 'mongoose';
import { Parallel } from 'src/parallel/model/parallel.entity';
import { Student } from 'src/student/model/student.model';
import { SchoolTerm } from 'src/school-term/model/school-term.entity';

@Injectable()
export class EnrollmentService {
  
  constructor(
    @InjectModel('Enrollment') private readonly modelEnrollment: Model<Enrollment>,
    @InjectModel('Parallel') private readonly modeloParallel: Model<Parallel>,
    @InjectModel('Student') private readonly modelStudent: Model<Student>,
    @InjectModel('SchoolTerm') private readonly modelSchoolTerm: Model<SchoolTerm>
    ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { _parallel, _student } = createEnrollmentDto

    const currentSchoolTerm = await this.modelSchoolTerm.findOne({ current: true })
    if(!currentSchoolTerm){
      throw new NotFoundException('No existe el periodo actual')
    }

    const parallel = await this.modeloParallel.findById(_parallel);
    if(!parallel){
      throw new NotFoundException('No se encontro el paralelo');
    }

    const student = await this.modelStudent.findById(_student);
    if(!student){
      throw new NotFoundException('No se encontro el estudiante');
    }

    const existingEnrollment = await this.modelEnrollment.findOne({
      $or: [
        { _student: _student, '_parallel._schoolTerm': currentSchoolTerm._id },
        { _student: _student, _parallel: _parallel }
      ]
    })
    if(existingEnrollment){
      throw new NotFoundException('El estudiante ya tiene una matricula en este periodo y paralelo')
    }

    const utcDateInMillis = new Date().getTime(); 

    return await this.modelEnrollment.create({
      _parallel: parallel._id,
      _student: student._id,
      date: utcDateInMillis
    })
  }

  async findAll() {
    return await this.modelEnrollment.find().populate({
      path: '_parallel',
      populate: [
        {
          path: '_grade',
          model: 'GradeModel'
        },
        {
          path: '_schoolTerm',
          model: 'SchoolTerm'
        }
      ]
    })
    .populate('_student');
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `${id} and ${updateEnrollmentDto}`
  }

  async remove(id: string) {
    return this.modelEnrollment.findByIdAndDelete(id);
  }
}