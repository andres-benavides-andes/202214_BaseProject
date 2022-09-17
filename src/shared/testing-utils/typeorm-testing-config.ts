import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';
import { Supermercado } from '../../supermercado/entities/supermercado.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      Ciudad,
      Supermercado,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    Ciudad,
    Supermercado,
  ]),
];
