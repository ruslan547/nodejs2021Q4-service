import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Updatable } from '../../common/entity/updatable';
import { BoardColumn } from './column.model';

@Entity()
export class Board extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.boardId)
  columns: BoardColumn[]
}
