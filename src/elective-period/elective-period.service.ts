import { Injectable } from '@nestjs/common';
import { CreateElectivePeriodDto } from './dto/create-elective-period.dto';
import { UpdateElectivePeriodDto } from './dto/update-elective-period.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolTerm } from './model/elective-period.entity';
import { Model } from 'mongoose';

@Injectable()
export class ElectivePeriodService {
  constructor(
    @InjectModel(SchoolTerm.name)
    private readonly schoolModel: Model<SchoolTerm>,
  ) {}

  async create(createElectivePeriodDto: CreateElectivePeriodDto) {
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

  async update(id: string, updateElectivePeriodDto: UpdateElectivePeriodDto) {
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
