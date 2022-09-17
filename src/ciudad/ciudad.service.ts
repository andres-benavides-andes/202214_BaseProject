import { Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CiudadService {

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
  ){}
  
  validatPais(pais:string):boolean{
    const paises = [
      "Argentina", 
      "Ecuador", 
      "Paraguay"
    ]
    return paises.includes(pais);
  }

  async create(ciudad: Ciudad): Promise<Ciudad>  {
    
    if (!this.validatPais(ciudad.pais))
      throw new BusinessLogicException("Valor de pais invalido", BusinessError.PRECONDITION_FAILED);
    return await this.ciudadRepository.save(ciudad);
  }

  async findAll(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find({ relations: ["supermercados"] });
  }

  async findOne(id: string) {
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id}, relations: ["supermercados"] } );
    if (!ciudad)
      throw new BusinessLogicException("Ciudad no encontrada", BusinessError.NOT_FOUND);
    return ciudad;
  }

  async update(id: string, ciudad: Ciudad) {
    
    const ciudadUpdate: Ciudad = await this.ciudadRepository.findOne({where: {id} } );
    if (!ciudadUpdate)
      throw new BusinessLogicException("Ciudad no encontrada", BusinessError.NOT_FOUND);
    if (!this.validatPais(ciudad.pais))
      throw new BusinessLogicException("Valor de pais invalido", BusinessError.PRECONDITION_FAILED);
      return await this.ciudadRepository.save({...ciudadUpdate, ...ciudad});
  }

  async delete(id: string) {
    const ciudad: Ciudad = await this.ciudadRepository.findOne({where: {id}, relations: ["supermercados"] } );
    if (!ciudad)
      throw new BusinessLogicException("Ciudad no encontrada", BusinessError.NOT_FOUND);
    await this.ciudadRepository.remove(ciudad);
  }
}
