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
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: true })
  name: string;

  @Column('varchar', { length: 250, nullable: true })
  login: string;

  @Column('varchar', { length: 250, nullable: true })
  password: string;

  constructor(options: UserOptions) {
    super();
    this.id = 0;
    this.name = options?.name;
    this.login = options?.login;
    this.password = options?.password;
  }

  static toResponse(user: User) {
    return { id: user?.id, name: user?.name, login: user.login };
  }
}
