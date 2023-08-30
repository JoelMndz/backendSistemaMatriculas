import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParallelService } from './parallel.service';
import { CreateParallelDto } from './dto/create-parallel.dto';
import { UpdateParallelDto } from './dto/update-parallel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Modulo de Paralelo')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('parallel')
export class ParallelController {
  constructor(private readonly parallelService: ParallelService) {}

  @Post()
  create(@Body() createParallelDto: CreateParallelDto) {
    return this.parallelService.create(createParallelDto);
  }

  @Get()
  findAll() {
    return this.parallelService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParallelDto: UpdateParallelDto) {
    return this.parallelService.update(id, updateParallelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parallelService.remove(id);
  }
}
