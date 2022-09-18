import { Controller, Get, Post, Body, Put, Param, Delete,UseInterceptors,HttpCode } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor'

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('ciudades')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    const ciudad: Ciudad = plainToInstance(Ciudad, createCiudadDto);
    return this.ciudadService.create(ciudad);
  }

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    const ciudad: Ciudad = plainToInstance(Ciudad, updateCiudadDto);
    return this.ciudadService.update(id, ciudad);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.ciudadService.delete(id);
  }
}
