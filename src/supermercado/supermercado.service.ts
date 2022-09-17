import { Injectable } from '@nestjs/common';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';

@Injectable()
export class SupermercadoService {
  create(createSupermercadoDto: CreateSupermercadoDto) {
    return 'This action adds a new supermercado';
  }

  findAll() {
    return `This action returns all supermercado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supermercado`;
  }

  update(id: number, updateSupermercadoDto: UpdateSupermercadoDto) {
    return `This action updates a #${id} supermercado`;
  }

  remove(id: number) {
    return `This action removes a #${id} supermercado`;
  }
}
