import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Updatable } from '../../utils/updatable';

@Entity()
export class User extends Updatable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: true })
  name: string;

  @Column('varchar', { length: 50, nullable: true })
  login: string;

  @Column('varchar', { length: 250, nullable: true })
  password: string;

  static toResponse(user: User) {
    return { id: user?.id, name: user?.name, login: user.login };
  }
}
