import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Updatable } from '../../common/entity/updatable';
import { BoardColumn } from './column.model';

export interface BoardOption {
  id: string;
  title: string;
  columns: BoardColumn[];
}

@Entity()
export class Board extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 250 })
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.boardId)
  columns: BoardColumn[]
}
