import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CreateCiudadSupermercadoDto } from './dto/create-ciudad-supermercado.dto';
import { UpdateCiudadSupermercadoDto } from './dto/update-ciudad-supermercado.dto';

@Controller('ciudad-supermercado')
export class CiudadSupermercadoController {
  constructor(private readonly ciudadSupermercadoService: CiudadSupermercadoService) {}

  @Post()
  create(@Body() createCiudadSupermercadoDto: CreateCiudadSupermercadoDto) {
    return this.ciudadSupermercadoService.create(createCiudadSupermercadoDto);
  }

  @Get()
  findAll() {
    return this.ciudadSupermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadSupermercadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadSupermercadoDto: UpdateCiudadSupermercadoDto) {
    return this.ciudadSupermercadoService.update(+id, updateCiudadSupermercadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadSupermercadoService.remove(+id);
  }
}
