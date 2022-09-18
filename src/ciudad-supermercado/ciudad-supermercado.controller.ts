import { Controller, Get, Post, Body, Put, Param, Delete,UseInterceptors,HttpCode } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CreateSupermercadoDto } from '../supermercado/dto/create-supermercado.dto';
import { Supermercado } from 'src/supermercado/entities/supermercado.entity';
import { plainToInstance } from 'class-transformer';



@Controller('ciudades')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
  constructor(private readonly ciudadSupermercadoService: CiudadSupermercadoService) {}

  
  @Post(':ciudadId/supermercados/:supermercadoId')
  async addSupermercadoACiudad(@Param('ciudadId') ciudadId: string, @Param('supermercadoId')supermercadoId:string){
    return await this.ciudadSupermercadoService.addSupermercadoACiudad(ciudadId,supermercadoId);
  }

  @Get(':ciudadId/supermercados/:supermercadoId')
   async findSupermercadoPorCiudad(@Param('ciudadId') ciudadId: string, @Param('supermercadoId') supermercadoId: string){
       return await this.ciudadSupermercadoService.findSupermercadoPorCiudad(ciudadId, supermercadoId);
   }

  @Get(':ciudadId/supermercados')
   async findSupermercadosPorCiudad(@Param('ciudadId') ciudadId: string){
       return await this.ciudadSupermercadoService.findSupermercadosPorCiudad(ciudadId);
   }

  @Put(':ciudadId/supermercados')
   async updateSupermercadoPorCiudad(@Body() supermercadoDto: CreateSupermercadoDto[], @Param('ciudadId') ciudadId: string){
       const supermercado = plainToInstance(Supermercado, supermercadoDto)
       return await this.ciudadSupermercadoService.updateSupermercadoPorCiudad(ciudadId, supermercado);
   }

  @Delete(':ciudadId/supermercados/:supermercadoId')
  @HttpCode(204)
   async deleteSupermercadoPorCiudad(@Param('ciudadId') ciudadId: string, @Param('supermercadoId') supermercadoId: string){
       return await this.ciudadSupermercadoService.deleteSupermercadoPorCiudad(ciudadId, supermercadoId);
   }
}
