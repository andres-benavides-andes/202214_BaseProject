import {IsNotEmpty, IsString, IsUrl} from 'class-validator';


export class CreateCiudadDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly pais: string;

  @IsString()
  @IsNotEmpty()
  readonly num_habitantes: number;

}
