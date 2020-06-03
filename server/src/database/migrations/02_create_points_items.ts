import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('points_items_', table => {
    table.increments('id').primary();

    table.integer('points_id').notNullable().references('id').inTable('points');

    table.integer('items_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('points_items_');
}
