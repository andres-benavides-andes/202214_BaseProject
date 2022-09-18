import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoService } from './supermercado.service';
import { Supermercado } from './entities/supermercado.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<Supermercado>;
  let supermercadoesList: Supermercado[];
  let errorValidacion = "El nombre debe contener más de 10 caracteres";
  let errorNoEncontrado = "Supermercado no encontrado";
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermercadoService],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<Supermercado>>(getRepositoryToken(Supermercado));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    supermercadoesList = [];
    for(let i = 0; i < 5; i++){
        const supermercado: Supermercado = await repository.save({
        nombre: faker.lorem.sentence(4),
        longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()})
        supermercadoesList.push(supermercado);
    }
  }
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll --- Debe retornar todos los supermercadoes', async () => {
    const supermercadoes: Supermercado[] = await service.findAll();
    expect(supermercadoes).not.toBeNull();
    expect(supermercadoes).toHaveLength(supermercadoesList.length);
  });

  it('findOne --- Debe retornar un supermercado', async () => {
    const storedSupermercado: Supermercado = supermercadoesList[0];
    const supermercado: Supermercado = await service.findOne(storedSupermercado.id);
    expect(supermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedSupermercado.nombre)
    expect(supermercado.longitud).toEqual(storedSupermercado.longitud)
    expect(supermercado.latitud).toEqual(storedSupermercado.latitud)
    expect(supermercado.pagina_web).toEqual(storedSupermercado.pagina_web)
    
  });

  it('findOne --- Debe retornar un error por supermercado invalida', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", errorNoEncontrado)
  });


  it('CREATE --- Debe retornar un nuevo supermercado', async () => {
    
    const supermercado: Supermercado = await repository.save({
      nombre: faker.lorem.sentence(4),
      longitud: faker.address.longitude() ,
      latitud: faker.address.latitude(),
      pagina_web: faker.internet.url()})
    const nuevaSupermercado: Supermercado = await service.create(supermercado);
    expect(nuevaSupermercado).not.toBeNull();

    const storedSupermercado: Supermercado = await repository.findOne({where: {id: nuevaSupermercado.id}})
    expect(storedSupermercado).not.toBeNull();
    expect(storedSupermercado.nombre).toEqual(nuevaSupermercado.nombre)
    expect(storedSupermercado.longitud).toEqual(nuevaSupermercado.longitud)
    expect(storedSupermercado.latitud).toEqual(nuevaSupermercado.latitud)
    expect(supermercado.pagina_web).toEqual(storedSupermercado.pagina_web)
    
  });

  it('CREATE --- Debe retornar un error por un longitud de nombre no valido', async () => {
    
    const supermercado={
      id:"",
      nombre: "JHBC",
      longitud: faker.address.longitude() ,
      latitud: faker.address.latitude(),
      pagina_web: faker.internet.url(),
      ciudades: []
    }

    await expect(() => service.create(supermercado)).rejects.toHaveProperty("message", errorValidacion)
  });

  it('UPDATE --- Debe modificar un supermercado', async () => {
    const supermercado: Supermercado = supermercadoesList[0];
    supermercado.nombre = faker.lorem.sentence(4);
    supermercado.longitud = faker.address.longitude();
  
    const updatedsupermercado: Supermercado = await service.update(supermercado.id, supermercado);
    expect(updatedsupermercado).not.toBeNull();
  
    const storedsupermercado: Supermercado = await repository.findOne({ where: { id: supermercado.id } })
    expect(storedsupermercado).not.toBeNull();
    expect(storedsupermercado.nombre).toEqual(supermercado.nombre)
  });

  it('UPDATE --- Debe retornar un error por longitud de nombre no valido', async () => {
    const supermercado: Supermercado = supermercadoesList[0];
    supermercado.nombre = "D1";
    supermercado.longitud = faker.address.longitude();
  
    await expect(() => service.update(supermercado.id, supermercado)).rejects.toHaveProperty("message", errorValidacion)
   
  });


  it('UPDATE ---  Debe retornar un error por supermercado no encontrado', async () => {
    let supermercado: Supermercado = supermercadoesList[0];
    supermercado = {
      ...supermercado, nombre: "Barranquilla", longitud: faker.address.longitude()
    }
    await expect(() => service.update("0", supermercado)).rejects.toHaveProperty("message", errorNoEncontrado)
  });

  it('delete Debe eliminar un supermercado', async () => {
    const supermercado: Supermercado = supermercadoesList[0];
    await service.delete(supermercado.id);
  
    const deletedsupermercado: Supermercado = await repository.findOne({ where: { id: supermercado.id } })
    expect(deletedsupermercado).toBeNull();
  });

  it('delete Debe retornar un error por supermercado no encontrado', async () => {
    const supermercado: Supermercado = supermercadoesList[0];
    await service.delete(supermercado.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", errorNoEncontrado)
  });
});
