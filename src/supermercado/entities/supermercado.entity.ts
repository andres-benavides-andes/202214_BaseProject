import { Column, Entity, ManyToMany, PrimaryGeneratedColumn,JoinTable } from 'typeorm';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';
@Entity()
export class Supermercado {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  longitud: string;

  @Column()
  latitud: string;

  @Column()
  pagina_web: string;

  @ManyToMany(() => Ciudad, ciudad => ciudad.supermercados)
  ciudades: Ciudad[];

}
