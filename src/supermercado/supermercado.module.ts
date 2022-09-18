import { Module } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoController } from './supermercado.controller';
import { Supermercado } from './entities/supermercado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Supermercado])],
  controllers: [SupermercadoController],
  providers: [SupermercadoService]
})
export class SupermercadoModule {}
