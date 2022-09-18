import {IsNotEmpty, IsString, IsUrl} from 'class-validator';


export class CreateSupermercadoDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly longitud: string;

  @IsString()
  @IsNotEmpty()
  readonly latitud: string;

  @IsString()
  @IsNotEmpty()
  readonly pagina_web: string;

}
