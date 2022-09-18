import { Module } from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { Ciudad } from '../ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercado,Ciudad])],
  controllers: [CiudadSupermercadoController],
  providers: [CiudadSupermercadoService]
})
export class CiudadSupermercadoModule {}
