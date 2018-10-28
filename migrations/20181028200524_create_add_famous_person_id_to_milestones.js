'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table) {
      table.integer('famous_person_id').unsigned().notNull().index().references('id').inTable('famous_people');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', table => {
      table.dropColumn('famous_person_id');
    }),
  ]);
};
