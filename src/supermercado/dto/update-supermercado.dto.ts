import { PartialType } from '@nestjs/mapped-types';
import { CreateSupermercadoDto } from './create-supermercado.dto';

export class UpdateSupermercadoDto extends PartialType(CreateSupermercadoDto) {}
