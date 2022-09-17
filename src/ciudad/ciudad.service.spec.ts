import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<Ciudad>;
  let ciudadesList: Ciudad[];
  const paises = [
    "Argentina", 
    "Ecuador", 
    "Paraguay"
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadService],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<Ciudad>>(getRepositoryToken(Ciudad));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    ciudadesList = [];
    for(let i = 0; i < 5; i++){
        const ciudad: Ciudad = await repository.save({
        nombre: faker.address.city(),
        pais: faker.lorem.sentence(),
        num_habitantes: parseInt(faker.random.numeric(6))})
        ciudadesList.push(ciudad);
    }
  }
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('CREATE --- debe retornar una nueva ciudad', async () => {
    let pos_pais = Math.floor(Math.random() * 4);
    const ciudad: Ciudad = {
      id: "",
      nombre: faker.address.city(),
      pais: paises[pos_pais],
      num_habitantes: parseInt(faker.random.numeric(6)),
      supermercados: []
    }
    const nuevaCiudad: Ciudad = await service.create(ciudad);
    expect(nuevaCiudad).not.toBeNull();

    const storedCiudad: Ciudad = await repository.findOne({where: {id: nuevaCiudad.id}})
    expect(storedCiudad).not.toBeNull();
    expect(storedCiudad.nombre).toEqual(nuevaCiudad.nombre)
    expect(storedCiudad.pais).toEqual(nuevaCiudad.pais)
    expect(storedCiudad.num_habitantes).toEqual(nuevaCiudad.num_habitantes)
    
  });

  it('CREATE --- debe retornar un error por un pais no valido', async () => {
    let pos_pais = Math.floor(Math.random() * 4);
    const ciudad: Ciudad = {
      id: "",
      nombre: faker.address.city(),
      pais: faker.address.city(),
      num_habitantes: parseInt(faker.random.numeric(6)),
      supermercados: []
    }
    await expect(() => service.create(ciudad)).rejects.toHaveProperty("message", "Valor de pais invalido")
  });
});
