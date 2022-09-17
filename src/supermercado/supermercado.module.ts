import { Module } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoController } from './supermercado.controller';

@Module({
  controllers: [SupermercadoController],
  providers: [SupermercadoService]
})
export class SupermercadoModule {}
