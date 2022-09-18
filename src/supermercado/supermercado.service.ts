import { Injectable } from '@nestjs/common';
import { Supermercado } from './entities/supermercado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class SupermercadoService {

  
  
  constructor(
    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>
  ){}

  validarLongitudNombre(nombre:string){
    if(nombre.length < 10)
      throw new BusinessLogicException("El nombre debe contener más de 10 caracteres", BusinessError.PRECONDITION_FAILED);
  }

  async create(supermercado: Supermercado): Promise<Supermercado>  {
    this.validarLongitudNombre(supermercado.nombre)
    return await this.supermercadoRepository.save(supermercado);
  }

  async findAll(): Promise<Supermercado[]> {
    return await this.supermercadoRepository.find({ relations: ["ciudades"] });
  }

  async findOne(id: string) {
    const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id}, relations: ["ciudades"] } );
    if (!supermercado)
      throw new BusinessLogicException("Supermercado no encontrado", BusinessError.NOT_FOUND);
    return supermercado;
  }

  async update(id: string, supermercado: Supermercado) {
    
    const supermercadoUpdate: Supermercado = await this.supermercadoRepository.findOne({where: {id} } );
    if (!supermercadoUpdate)
      throw new BusinessLogicException("Supermercado no encontrado", BusinessError.NOT_FOUND);
    //this.validarLongitudNombre(supermercadoUpdate.nombre)
    
    return await this.supermercadoRepository.save({...supermercadoUpdate, ...supermercado});
  }

  async delete(id: string) {
    const supermercado: Supermercado = await this.supermercadoRepository.findOne({where: {id}, relations: ["ciudades"] } );
    if (!supermercado)
      throw new BusinessLogicException("Supermercado no encontrado", BusinessError.NOT_FOUND);
    await this.supermercadoRepository.remove(supermercado);
  }
}
