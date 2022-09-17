import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { Ciudad } from './entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
