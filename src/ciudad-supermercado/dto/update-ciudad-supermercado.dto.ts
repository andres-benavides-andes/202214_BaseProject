import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadSupermercadoDto } from './create-ciudad-supermercado.dto';

export class UpdateCiudadSupermercadoDto extends PartialType(CreateCiudadSupermercadoDto) {}
