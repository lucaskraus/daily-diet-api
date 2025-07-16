import { knex as setupKnex, Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './src/shared/database/db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/shared/database/migrations',
  },
};

export const knex = setupKnex(config);
