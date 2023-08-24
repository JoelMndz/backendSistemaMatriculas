import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParallelDto } from './dto/create-parallel.dto';
import { UpdateParallelDto } from './dto/update-parallel.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Parallel } from './model/parallel.entity';
import { SchoolTerm } from 'src/school-term/model/school-term.entity';

@Injectable()
export class ParallelService {

  constructor(
    @InjectModel(Parallel.name) private readonly modelParallel: Model<Parallel>,
    @InjectModel(SchoolTerm.name) private readonly modelSchoolTerm : Model<SchoolTerm>,
    ){}

  async create(createParallelDto: CreateParallelDto) {
    console.log(createParallelDto)
    const upperCaseName = createParallelDto.name.toUpperCase();
    const currentSchoolTerm = await this.modelSchoolTerm.findOne({ current: true })
    console.log(currentSchoolTerm)

    if (!currentSchoolTerm) {
      throw new NotFoundException('Periodo actual no encontrado');
    }

    const existeParalelo = await this.modelParallel.findOne({
      _schoolTerm: currentSchoolTerm._id,
      _grade: createParallelDto._grade,
      name: upperCaseName
    })

    if(existeParalelo){
      throw new NotFoundException('Paralelo ya esta registrado')
    }
    
    return await this.modelParallel.create({
      name: upperCaseName,
      quotas: createParallelDto.quotas,
      _schoolTerm: currentSchoolTerm._id,
      _grade: createParallelDto._grade,
      _professor: createParallelDto._professor
    })
  }

  async findAll() { 
    return await this.modelParallel.find({ 
      status: true 
    })
    .populate('_schoolTerm _professor')
    .populate('_grade')
  }

  async update(id: string, updateParallelDto: UpdateParallelDto) {
    const upperCaseName = updateParallelDto.name.toUpperCase();

    const currentSchoolTerm = await this.modelSchoolTerm.findOne({ current: true });

    if (!currentSchoolTerm) {
      throw new NotFoundException('Periodo actual no encontrado');
    }
    const existeParalelo = await this.modelParallel.findOne({
      _schoolTerm: currentSchoolTerm._id,
      _grade: updateParallelDto._grade,
      name: upperCaseName
    })

    if(existeParalelo){
      throw new NotFoundException('El paralelo ya esta registrado en este curso y periodo')
    }
    return await this.modelParallel.findByIdAndUpdate(id, {
      name: upperCaseName,
      quotas: updateParallelDto.quotas,
      _grade: updateParallelDto._grade,
      _professor: updateParallelDto._professor
    })
}

  async remove(id: string) {
    return await this.modelParallel.findByIdAndUpdate(id , {
      status: false
    })
  }
}