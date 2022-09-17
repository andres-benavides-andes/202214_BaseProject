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
  let paises = [
    "Argentina", 
    "Ecuador", 
    "Paraguay"
  ]
  let pos_pais = Math.floor(Math.random() * 4);
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
        pais: paises[0],
        num_habitantes: parseInt(faker.random.numeric(6))})
        ciudadesList.push(ciudad);
    }
  }
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll --- Debe retornar todas las ciudades', async () => {
    const ciudades: Ciudad[] = await service.findAll();
    expect(ciudades).not.toBeNull();
    expect(ciudades).toHaveLength(ciudadesList.length);
  });

  it('findOne --- Debe retornar una ciudad', async () => {
    const storedCiudad: Ciudad = ciudadesList[0];
    const ciudad: Ciudad = await service.findOne(storedCiudad.id);
    expect(ciudad).not.toBeNull();
    expect(ciudad.nombre).toEqual(storedCiudad.nombre)
    expect(ciudad.pais).toEqual(storedCiudad.pais)
    expect(ciudad.num_habitantes).toEqual(storedCiudad.num_habitantes)
    
  });

  it('findOne --- Debe retornar un error por ciudad invalida', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "Ciudad no encontrada")
  });


  it('CREATE --- Debe retornar una nueva ciudad', async () => {
    
    const ciudad: Ciudad = {
      id: "",
      nombre: faker.address.city(),
      pais: paises[2],
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
    
    const ciudad: Ciudad = {
      id: "",
      nombre: faker.address.city(),
      pais: faker.address.city(),
      num_habitantes: parseInt(faker.random.numeric(6)),
      supermercados: []
    }
    await expect(() => service.create(ciudad)).rejects.toHaveProperty("message", "Valor de pais invalido")
  });

  it('UPDATE --- Debe modificar una ciudad', async () => {
    const ciudad: Ciudad = ciudadesList[0];
    ciudad.nombre = "Chiquinquira";
    ciudad.pais = paises[1];
  
    const updatedciudad: Ciudad = await service.update(ciudad.id, ciudad);
    expect(updatedciudad).not.toBeNull();
  
    const storedciudad: Ciudad = await repository.findOne({ where: { id: ciudad.id } })
    expect(storedciudad).not.toBeNull();
    expect(storedciudad.nombre).toEqual(ciudad.nombre)
  });

  it('UPDATE --- Debe retornar un error por pais no valido', async () => {
    const ciudad: Ciudad = ciudadesList[0];
    ciudad.nombre = "Chiquinquira";
    ciudad.pais = faker.address.city();
  
    await expect(() => service.update(ciudad.id, ciudad)).rejects.toHaveProperty("message", "Valor de pais invalido")
   
  });


  it('UPDATE ---  Debe retornar un error por ciudad no encontrada', async () => {
    let ciudad: Ciudad = ciudadesList[0];
    ciudad = {
      ...ciudad, nombre: "Barranquilla", pais: paises[1]
    }
    await expect(() => service.update("0", ciudad)).rejects.toHaveProperty("message", "Ciudad no encontrada")
  });

  it('delete Debe eliminar una ciduad', async () => {
    const ciudad: Ciudad = ciudadesList[0];
    await service.delete(ciudad.id);
  
    const deletedciudad: Ciudad = await repository.findOne({ where: { id: ciudad.id } })
    expect(deletedciudad).toBeNull();
  });

  it('delete Debe retornar un error por ciudad no encontrada', async () => {
    const ciudad: Ciudad = ciudadesList[0];
    await service.delete(ciudad.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "Ciudad no encontrada")
  });
});
