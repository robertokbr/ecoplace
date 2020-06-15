import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('password').notNullable();
    table.string('email').nullable();
    table.decimal('price').nullable();
    table.string('description').nullable();



  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
}
