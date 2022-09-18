import { Controller, Get, Post, Body, Put, Param, Delete,UseInterceptors,HttpCode } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';
import { Supermercado } from './entities/supermercado.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor'



@UseInterceptors(BusinessErrorsInterceptor)
@Controller('supermercados')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Post()
  create(@Body() createSupermercadoDto: CreateSupermercadoDto) {
    const supermercado: Supermercado = plainToInstance(Supermercado, createSupermercadoDto);
    return this.supermercadoService.create(supermercado);
  }

  @Get()
  findAll() {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermercadoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupermercadoDto: UpdateSupermercadoDto) {
    const supermercado: Supermercado = plainToInstance(Supermercado, updateSupermercadoDto);
    return this.supermercadoService.update(id, supermercado);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.supermercadoService.delete(id);
  }
}
