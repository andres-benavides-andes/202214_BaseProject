import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermercado } from './supermercado/entities/supermercado.entity';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { CiudadSupermercadoModule } from './ciudad-supermercado/ciudad-supermercado.module';

@Module({
  imports: [CiudadModule, SupermercadoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'asdfgh',
      database: 'parcial',
      entities: [Ciudad, Supermercado],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    CiudadSupermercadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
