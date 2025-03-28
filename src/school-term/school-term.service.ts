import { Injectable } from '@nestjs/common';
import { CreateSchoolTermDto } from './dto/create-school-term.dto';
import { UpdateSchoolTermDto } from './dto/update-school-term.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolTerm } from './model/school-term.entity';
import { Model } from 'mongoose';

@Injectable()
export class SchoolTermService {
  constructor(
    @InjectModel(SchoolTerm.name)
    private readonly schoolModel: Model<SchoolTerm>,
  ) {}

  async create(createElectivePeriodDto: CreateSchoolTermDto) {
    await this.schoolModel.updateMany(
      { current: true },
      { $set: { current: false } },
    );

    return await this.schoolModel.create({
      name: createElectivePeriodDto.name,
      description: createElectivePeriodDto.description,
      current: true,
    });
  }

  async findAll(): Promise<SchoolTerm[]> {
    return await this.schoolModel.find();
  }

  async findOne(id: string) {
    return this.schoolModel.findById(id);
  }

  async update(id: string, updateElectivePeriodDto: UpdateSchoolTermDto) {
    const findTerm = await this.schoolModel.findById(id);

    if(!findTerm){
      throw new Error('No se encontro el periodo');
    }
    return await this.schoolModel.findByIdAndUpdate(findTerm, {
      name: updateElectivePeriodDto.name,
      description: updateElectivePeriodDto.description,
    });
  }

  async remove(id: string) {
    const findCurrentTerm = await this.schoolModel.findById(id);

    if (findCurrentTerm.current === true) {
      throw new Error('Cannot delete current school term');
    }

    return await this.schoolModel.findByIdAndDelete(id);
  }
}
