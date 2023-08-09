import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ElectivePeriodService } from './elective-period.service';
import { CreateElectivePeriodDto } from './dto/create-elective-period.dto';
import { UpdateElectivePeriodDto } from './dto/update-elective-period.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Elective Period')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('elective-period')
export class ElectivePeriodController {
  constructor(private readonly electivePeriodService: ElectivePeriodService) {}

  @Post()
  create(@Body() createElectivePeriodDto: CreateElectivePeriodDto) {
    return this.electivePeriodService.create(createElectivePeriodDto);
  }

  @Get()
  findAll() {
    return this.electivePeriodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electivePeriodService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectivePeriodDto: UpdateElectivePeriodDto,
  ) {
    return this.electivePeriodService.update(id, updateElectivePeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electivePeriodService.remove(id);
  }
}
