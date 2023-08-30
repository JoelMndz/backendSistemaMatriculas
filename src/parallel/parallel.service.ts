import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParallelDto } from './dto/create-parallel.dto';
import { UpdateParallelDto } from './dto/update-parallel.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Parallel } from './model/parallel.entity';
import { SchoolTerm } from 'src/school-term/model/school-term.entity';
import { GradeModel } from 'src/grade/model/grade.schema';
import { Professor } from 'src/professor/model/professor.entity';

@Injectable()
export class ParallelService {

  constructor(
    @InjectModel(Parallel.name) private readonly modelParallel: Model<Parallel>,
    @InjectModel(SchoolTerm.name) private readonly modelSchoolTerm : Model<SchoolTerm>,
    @InjectModel(GradeModel.name) private readonly modelGrade: Model<GradeModel>,
    @InjectModel(Professor.name) private readonly modelProfessor: Model<Professor>
    ){}

  async create(createParallelDto: CreateParallelDto) {
    const upperCaseName = createParallelDto.name.toUpperCase();
    const currentSchoolTerm = await this.modelSchoolTerm.findOne({ current: true })

    if (!currentSchoolTerm) {
      throw new NotFoundException('Periodo actual no encontrado');
    }

    const existingParallel = await this.modelParallel.findOne({
      _schoolTerm: currentSchoolTerm._id,
      _grade: createParallelDto._grade,
      name: upperCaseName
    })

    if(existingParallel){
      throw new ConflictException('El Paralelo ya esta registrado en este grado')
    }
    

    const newParalell = await this.modelParallel.create({
      name: upperCaseName,
      _schoolTerm: currentSchoolTerm._id,
      quotas: createParallelDto.quotas,
      _grade: createParallelDto._grade,
      _professor: createParallelDto._professor
    })

    return await this.modelParallel.findById(newParalell).populate('_professor').populate('_schoolTerm')
  }

  async update(id: string, updateParallelDto: UpdateParallelDto) {
    const existingParallel = await this.modelParallel.findById(id);

    if (!existingParallel) {
      throw new Error('Paralelo no encontrado');
    }

    const updatedGrade = await this.modelGrade.findById(updateParallelDto._grade);
    if (!updatedGrade) {
      throw new Error('Grado no encontrado');
    }

    const updatedProfessor = await this.modelProfessor.findById(updateParallelDto._professor);
    if (!updatedProfessor) {
      throw new Error('Profesor no encontrado');
    }

    const upperCaseName = updateParallelDto.name.toUpperCase();
    const currentSchoolTerm = await this.modelSchoolTerm.findOne({ current: true });

    if (!currentSchoolTerm) {
      throw new NotFoundException('Periodo actual no encontrado');
    }

    const duplicateParallel = await this.modelParallel.findOne({
      _id: { $ne: existingParallel._id },
      _schoolTerm: currentSchoolTerm._id,
      _grade: updateParallelDto._grade,
      name: upperCaseName
    });

    if (duplicateParallel) {
      throw new Error('El paralelo ya está registrado en este curso y periodo');
    }

    existingParallel.name = upperCaseName;
    existingParallel.quotas = updateParallelDto.quotas;
    existingParallel._grade = updatedGrade;
    existingParallel._professor = updatedProfessor;
    existingParallel._schoolTerm = currentSchoolTerm

    await existingParallel.save();

    return existingParallel;
}

  async remove(id: string) {
    return await this.modelParallel.findByIdAndDelete(id)
  }
}