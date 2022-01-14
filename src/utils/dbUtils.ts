import { createConnection, Connection, EntityTarget, Repository } from 'typeorm';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from '../common/dbConfig';
import { User } from '../resources/users/user.model';

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
        ],
        synchronize: true,
        logging: false,
      });

      if (connection.isConnected) {
        this.conn = connection;
        cb();
      }
    } catch (err) {
      console.log(err);
    }
  };

  getRepository = <T>(
    target: EntityTarget<T>,
  ): Repository<T> | undefined => this.conn?.getRepository(target);
}

export const driverManager = new DriverManager();
