import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Updatable } from '../../utils/updatable';

@Entity()
export class Task extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('int', { nullable: true })
  order: number;

  @Column('varchar', { length: 250 })
  description: string;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column('uuid', { nullable: true })
  boardId: string;

  @Column('uuid', { nullable: true })
  columnId: string;
}
