import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Updatable } from '../../utils/updatable';
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
