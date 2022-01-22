import { createConnection, Connection, EntityTarget, Repository, EntityManager } from 'typeorm';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from '../common/dbConfig';
import { Board } from '../resources/boards/board.model';
import { BoardColumn } from '../resources/boards/column.model';
import { Task } from '../resources/task/task.model';
import { User } from '../resources/users/user.model';
import { hash } from './dcryptUtils';

const ADMIN = 'admin';

const addAdmin = async (connection: Connection) => {
  const login = ADMIN;
  const user = await connection.getRepository(User)
    .createQueryBuilder('user')
    .where('user.login = :login', { login })
    .getOne();

  if (!user) {
    const password = await hash(ADMIN);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: ADMIN, login, password },
      ])
      .execute();
  }
};

class DriverManager {
  private conn: Connection | null = null;

  connect = async (cb: () => void) => {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: 'postgres',
        port: POSTGRES_PORT,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [
          User,
          Board,
          BoardColumn,
          Task,
        ],
        synchronize: true,
        logging: false,
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
      });

      if (connection.isConnected) {
        this.conn = connection;
        await connection.runMigrations();
        await addAdmin(connection);

        cb();
      }
    } catch (err) {
      console.log(err);
    }
  };

  getRepository = <T>(
    target: EntityTarget<T>,
  ): Repository<T> | undefined => this.conn?.getRepository(target);

  getManager = (): EntityManager | undefined => this.conn?.manager;
}

export const driverManager = new DriverManager();
