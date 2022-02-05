import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/users/user.module';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from './common/dbConfig';
import { User } from './resources/users/user.model';
import { Board } from './resources/boards/board.model';
import { BoardColumn } from './resources/boards/column.model';
import { Task } from './resources/task/task.model';
import { BoardModule } from './resources/boards/board.module';
import { LoginModule } from './resources/login/login.module';
import { AppLoggerMiddleware } from './middleware/logger';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    BoardModule,
    LoginModule,
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
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
