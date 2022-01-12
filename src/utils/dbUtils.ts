import { createConnection, Connection } from 'typeorm';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from '../common/dbConfig';
import { User } from '../resources/users/user.model';

export class DriverManager {
  static conn: Connection | null = null;

  static connect = async (cb: () => void) => {
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

      this.conn = connection;
    } catch (err) {
      console.log(err);
    }
  };
}
