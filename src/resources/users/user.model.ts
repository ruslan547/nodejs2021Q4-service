import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Updatable } from '../../common/entity/updatable';

export interface UserOptions {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity()
export class User extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: true })
  name: string;

  @Column('varchar', { length: 50, nullable: true })
  login: string;

  @Column('varchar', { length: 50, nullable: true })
  password: string;

  static toResponse(user: User) {
    return { id: user?.id, name: user?.name, login: user.login };
  }
}
