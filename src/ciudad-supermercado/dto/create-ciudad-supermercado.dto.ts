import {IsNotEmpty, IsString, IsUrl} from 'class-validator';


export class CreateCiudadSupermercadoDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

}
