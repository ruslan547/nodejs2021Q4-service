import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface UserOptions {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: true })
  name: string;

  @Column('varchar', { length: 250, nullable: true })
  login: string;

  @Column('varchar', { length: 250, nullable: true })
  password: string;

  constructor() {
    this.id = 1;
    this.name = '';
    this.login = '';
    this.password = '';
  }
}
