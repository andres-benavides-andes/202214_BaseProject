import { Module } from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';

@Module({
  controllers: [CiudadSupermercadoController],
  providers: [CiudadSupermercadoService]
})
export class CiudadSupermercadoModule {}
