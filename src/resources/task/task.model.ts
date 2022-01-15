import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Updatable } from '../../common/entity/updatable';

export interface TaskOption {
  id: string;
  title: string;
  order: string;
  description: string
  userId: string | null;
  boardId: string;
  columnId: string;
}

@Entity()
export class Task extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 50 })
  order: string;

  @Column('varchar', { length: 250 })
  description: string;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column('uuid')
  boardId: string;

  @Column('uuid')
  columnId: string;
}
