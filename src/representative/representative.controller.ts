import { Controller,UseGuards,Get,Post,Body,Delete,Patch,Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RepresentativeService } from './representative.service';
import { CreateRepresentativeDto } from './dto/createRepresentative.dto';
import { UpdateRepresentativeDto } from './dto/updateRepresentative.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Acudiente')
@Controller('representative')
export class RepresentativeController {

  constructor(
    private representativeService: RepresentativeService
  ){}
  
  @Get('get-all')
  getAll(){
    return this.representativeService.getAll()
  }

  @Post('create')
  create(@Body() createDto:CreateRepresentativeDto){
    return this.representativeService.create(createDto)
  }

  @Patch('update')
  update(@Body() updateDto: UpdateRepresentativeDto){
    return this.representativeService.update(updateDto)
  }

  @Delete('delete/:id')
  delete(@Param('id') id:string){
    return this.representativeService.delete(id)
  }
}
