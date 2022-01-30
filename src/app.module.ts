import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/users/user.module';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from './common/dbConfig';
import { User } from './resources/users/user.model';
import { Board } from './resources/boards/board.model';
import { BoardColumn } from './resources/boards/column.model';
import { Task } from './resources/task/task.model';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
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
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
