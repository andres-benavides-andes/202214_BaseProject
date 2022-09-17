import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoController } from './supermercado.controller';
import { SupermercadoService } from './supermercado.service';

describe('SupermercadoController', () => {
  let controller: SupermercadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermercadoController],
      providers: [SupermercadoService],
    }).compile();

    controller = module.get<SupermercadoController>(SupermercadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
