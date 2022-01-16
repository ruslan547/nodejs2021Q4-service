/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migration1642340344073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '50',
          isNullable: true,
        },
        {
          name: 'login',
          type: 'varchar',
          length: '50',
          isNullable: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '50',
          isNullable: true,
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'board',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'title',
          type: 'varchar',
          length: '50',
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'board_column',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'title',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'order',
          type: 'int',
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'task',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'title',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'order',
          type: 'int',
          isNullable: true,
        },
        {
          name: 'description',
          type: 'varchar',
          length: '250',
        },
        {
          name: 'userId',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'boardId',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'columnId',
          type: 'uuid',
          isNullable: true,
        },
      ],
    }), true);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
