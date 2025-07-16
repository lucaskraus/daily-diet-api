import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('date').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_in_diet').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
