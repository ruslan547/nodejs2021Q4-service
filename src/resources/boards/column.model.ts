import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.model';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250 })
  title: string;

  @Column('int')
  order: number;

  @Column('int')
  boardId: number;
}
