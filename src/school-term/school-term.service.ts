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
    return await this.schoolModel.create({
      name: createElectivePeriodDto.name,
      description: createElectivePeriodDto.description,
    });
  }

  async findAll(): Promise<SchoolTerm[]> {
    return await this.schoolModel.find();
  }

  async findOne(id: string) {
    return this.schoolModel.findById(id);
  }

  async update(id: string, updateElectivePeriodDto: UpdateSchoolTermDto) {
    return this.schoolModel.findByIdAndUpdate(
      id,
      {
        name: updateElectivePeriodDto.name,
        description: updateElectivePeriodDto.description,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.schoolModel.findByIdAndDelete(id);
  }
}
