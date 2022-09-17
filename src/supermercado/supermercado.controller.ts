import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';

@Controller('supermercado')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Post()
  create(@Body() createSupermercadoDto: CreateSupermercadoDto) {
    return this.supermercadoService.create(createSupermercadoDto);
  }

  @Get()
  findAll() {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermercadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupermercadoDto: UpdateSupermercadoDto) {
    return this.supermercadoService.update(+id, updateSupermercadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supermercadoService.remove(+id);
  }
}
