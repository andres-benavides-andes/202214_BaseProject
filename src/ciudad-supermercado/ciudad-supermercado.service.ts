import { Injectable } from '@nestjs/common';
import { Ciudad } from '../ciudad/entities/ciudad.entity';
import { UpdateCiudadSupermercadoDto } from './dto/update-ciudad-supermercado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermercado } from '../supermercado/entities/supermercado.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class CiudadSupermercadoService {

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,

    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>
  ){}

  mensajeErrorSumerpercado():string{
    return "No se encontro el supermercado con el id suministrado"
  }


  async addSupermercadoACiudad(ciudadId: string,supermercadoId:string): Promise<Ciudad> {
    const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id: supermercadoId}});
    if (!supermercado)
      throw new BusinessLogicException("No se encontro el supermercado con el id suministrado", BusinessError.NOT_FOUND);
  
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id: ciudadId}, relations: ["supermercados"]})

    if (!ciudad)
      throw new BusinessLogicException("No se encontro la ciudad con el id suministrado", BusinessError.NOT_FOUND);

    ciudad.supermercados = [...ciudad.supermercados, supermercado];
    return await this.ciudadRepository.save(ciudad);
  }

  async findSupermercadosPorCiudad(ciudadId: string):Promise<Supermercado[]>{
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id: ciudadId}, relations: ["supermercados"]});
    if (!ciudad)
      throw new BusinessLogicException("No se encontro la ciudad con el id suministrado", BusinessError.NOT_FOUND)
   
    return ciudad.supermercados;
  }

  async findSupermercadoPorCiudad(ciudadId: string,supermercadoId:string): Promise<Supermercado>{
    const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id: supermercadoId}});
    if (!supermercado)
      throw new BusinessLogicException("No se encontro el supermercado con el id suministrado", BusinessError.NOT_FOUND)
   
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id: ciudadId}, relations: ["supermercados"]});
    if (!ciudad)
      throw new BusinessLogicException("No se encontro la ciudad con el id suministrado", BusinessError.NOT_FOUND)

    const ciudadProducto: Supermercado = ciudad.supermercados.find(e => e.id === supermercado.id);

    if (!ciudadProducto)
      throw new BusinessLogicException("El supermercado con el id suministrado no esta asociado a la ciudad", BusinessError.PRECONDITION_FAILED)

    return ciudadProducto;
  }

  async updateSupermercadoPorCiudad(ciudadID: string, supermercados: Supermercado[]): Promise<Ciudad> {
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id: ciudadID}, relations: ["supermercados"]});

      if (!ciudad)
        throw new BusinessLogicException("No se encontro la ciudad con el id suministrado", BusinessError.NOT_FOUND)

      for (let i = 0; i < supermercados.length; i++) {
        const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id: supermercados[i].id}});
        if (!supermercado)
          throw new BusinessLogicException("No se encontro el supermercado con el id suministrado", BusinessError.NOT_FOUND)
      }

      ciudad.supermercados = supermercados;
      return await this.ciudadRepository.save(ciudad);
  }

  async deleteSupermercadoPorCiudad(ciudadId: string,supermercadoId:string) {
    const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id: supermercadoId}});
      if (!supermercado)
        throw new BusinessLogicException("No se encontro el supermercado con el id suministrado", BusinessError.NOT_FOUND)

      const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id: ciudadId}, relations: ["supermercados"]});
      if (!ciudad)
        throw new BusinessLogicException("No se encontro la ciudad con el id suministrado", BusinessError.NOT_FOUND)

      const museumProducto: Supermercado = ciudad.supermercados.find(e => e.id === supermercado.id);

      if (!museumProducto)
          throw new BusinessLogicException("El supermercado con el id suministrado no esta asociado a la ciudad", BusinessError.PRECONDITION_FAILED)

      ciudad.supermercados = ciudad.supermercados.filter(e => e.id !== supermercadoId);
      await this.ciudadRepository.save(ciudad);
  }
}
