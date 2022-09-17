import { Column, Entity, ManyToMany, PrimaryGeneratedColumn,JoinTable } from 'typeorm';
import { Supermercado } from '../../supermercado/entities/supermercado.entity';

@Entity()
export class Ciudad {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  num_habitantes: number;

  @ManyToMany(() => Supermercado, supermecado => supermecado.ciudades)
  @JoinTable()
  supermercados: Ciudad[];


}
