import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from '../ciudad/ciudad.service';
import { Ciudad } from '../ciudad/entities/ciudad.entity';
import { SupermercadoService } from '../supermercado/supermercado.service';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService;
  let ciudadRepository: Repository<Ciudad>;
  let supermercadoRepository: Repository<Supermercado>;
  let ciudad: Ciudad;
  let supermercadoList: Supermercado[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadSupermercadoService],
    }).compile();

    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
    ciudadRepository = module.get<Repository<Ciudad>>(
      getRepositoryToken(Ciudad),
    );
    supermercadoRepository = module.get<Repository<Supermercado>>(
      getRepositoryToken(Supermercado),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    supermercadoRepository.clear();
    ciudadRepository.clear();

    supermercadoList = [];
    for (let i = 0; i < 5; i++) {
      const supermercado: Supermercado = await supermercadoRepository.save({
        nombre: faker.lorem.sentence(4),
        longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()
      })
        supermercadoList.push(supermercado);
    }

    ciudad = await ciudadRepository.save({
      nombre: faker.address.city(),
      pais: "Ecuador",
      num_habitantes: parseInt(faker.random.numeric(6)),
      supermercados: supermercadoList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSupermercadoACiudad Debe agregar un supermercado a una ciudad', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      id:"",
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
      latitud: faker.address.latitude(),
      pagina_web: faker.internet.url()
    });

    const newCiudad: Ciudad = await ciudadRepository.save({
      id:"",
      nombre: faker.address.city(),
      pais: "Ecuador",
      num_habitantes: parseInt(faker.random.numeric(6)),
    });

    const result: Ciudad = await service.addSupermercadoACiudad(
      newCiudad.id,
      Supermercado.id,
    );

    expect(result.supermercados.length).toBe(1);
    expect(result.supermercados[0]).not.toBeNull();
    expect(result.supermercados[0].nombre).toBe(Supermercado.nombre);
    expect(result.supermercados[0].longitud).toBe(Supermercado.longitud);
  });

  it('addSupermercadoACiudad Debe lanzar una excepcion', async () => {
    const newCiudad: Ciudad = await ciudadRepository.save({
      id:"",
      nombre: faker.address.city(),
      pais: "Ecuador",
      num_habitantes: parseInt(faker.random.numeric(6)),
    });

    await expect(() =>
      service.addSupermercadoACiudad(newCiudad.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro el supermercado con el id suministrado',
    );
  });

  it('addArtworkMuseum Debe agregar una excepcion por una ciudad invalida', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()
    });

    await expect(() =>
      service.addSupermercadoACiudad('0', Supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro la ciudad con el id suministrado',
    );
  });

  it('findSupermercadoPorCiudad debe retornar un supermercado por museo', async () => {
    const supermercado: Supermercado = supermercadoList[0];
    const storedProducto: Supermercado =
      await service.findSupermercadoPorCiudad(
        ciudad.id,
        supermercado.id,
      );
    expect(storedProducto).not.toBeNull();
    expect(storedProducto.nombre).toBe(supermercado.nombre);
    expect(storedProducto.pagina_web).toBe(supermercado.pagina_web);
  });

  it('findSupermercadoPorCiudad debe lanzar una excepcion por un supermercado invalido', async () => {
    await expect(() =>
      service.findSupermercadoPorCiudad(ciudad.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro el supermercado con el id suministrado',
    );
  });

  it('findSupermercadoPorCiudad  Debe agregar una excepcion por una ciudad invalida', async () => {
    const supermercado: Supermercado = supermercadoList[0];
    await expect(() =>
      service.findSupermercadoPorCiudad('0', supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro la ciudad con el id suministrado',
    );
  });

  it('findSupermercadoPorCiudad Debe lanzar una excepcion para un supermercado no asociado a la ciudad', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
      latitud: faker.address.latitude(),
      pagina_web: faker.internet.url()
    });

    await expect(() =>
      service.findSupermercadoPorCiudad(ciudad.id, Supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'El supermercado con el id suministrado no esta asociado a la ciudad',
    );
  });

  it('findSupermercadosPorCiudad Debe retornar los supermercados por ciudad', async () => {
    const supermercados: Supermercado[] =
      await service.findSupermercadosPorCiudad(ciudad.id);
    expect(supermercados.length).toBe(5);
  });

  it('findSupermercadosPorCiudad  Debe agregar una excepcion por una ciudad invalida', async () => {
    await expect(() =>
      service.findSupermercadosPorCiudad('0'),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro la ciudad con el id suministrado',
    );
  });

  it('updateSupermercadoPorCiudad Debe actualizar la lista de supermercados para una ciudad', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()
    });

    const updatedCategoria: Ciudad =
      await service.updateSupermercadoPorCiudad(ciudad.id, [Supermercado]);
    expect(updatedCategoria.supermercados.length).toBe(1);

    expect(updatedCategoria.supermercados[0].nombre).toBe(Supermercado.nombre);
    expect(updatedCategoria.supermercados[0].pagina_web).toBe(Supermercado.pagina_web);
  });

  it('updateSupermercadoPorCiudad  Debe agregar una excepcion por una ciudad invalida', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()
    });

    await expect(() =>
      service.updateSupermercadoPorCiudad('0', [Supermercado]),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro la ciudad con el id suministrado',
    );
  });

  it('updateSupermercadoPorCiudad Debe lanzar una excepcion para un supermercado no valido', async () => {
    const Supermercado: Supermercado = supermercadoList[0];
    Supermercado.id = '0';

    await expect(() =>
      service.updateSupermercadoPorCiudad(ciudad.id, [Supermercado]),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro el supermercado con el id suministrado',
    );
  });

  it('deleteSupermercadoPorCiudad Debe remover el supermercado de una ciudad', async () => {
    const supermercado: Supermercado = supermercadoList[0];

    await service.deleteSupermercadoPorCiudad(ciudad.id, supermercado.id);

    const storedCategoria: Ciudad = await ciudadRepository.findOne({
      where: { id: ciudad.id },
      relations: ['supermercados'],
    });
    const deletedProducto: Supermercado = storedCategoria.supermercados.find(
      (a) => a.id === supermercado.id,
    );

    expect(deletedProducto).toBeUndefined();
  });

  it('deleteSupermercadoPorCiudad Debe lanzar una excepcion para un un supermercado no valido', async () => {
    await expect(() =>
      service.deleteSupermercadoPorCiudad(ciudad.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro el supermercado con el id suministrado',
    );
  });

  it('deleteSupermercadoPorCiudad Debe lanzar una excepcion para una ciudad no valida', async () => {
    const supermercado: Supermercado = supermercadoList[0];
    await expect(() =>
      service.deleteSupermercadoPorCiudad('0', supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'No se encontro la ciudad con el id suministrado',
    );
  });

  it('deleteSupermercadoPorCiudad Debe lanzar una excepcion para un supermercado no asociado', async () => {
    const Supermercado: Supermercado = await supermercadoRepository.save({
      nombre: faker.word.adjective(),
      longitud: faker.address.longitude(),
        latitud: faker.address.latitude(),
        pagina_web: faker.internet.url()
    });

    await expect(() =>
      service.deleteSupermercadoPorCiudad(ciudad.id, Supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'El supermercado con el id suministrado no esta asociado a la ciudad',
    );
  });
});
