import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: true })
  title: string;

  @Column('int')
  order: number;

  @Column('uuid')
  boardId: string;
}
