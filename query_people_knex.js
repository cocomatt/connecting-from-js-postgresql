'use strict';

const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
  },
});

const arg = process.argv[2];
console.log(arg);

const displayQueryByName = function showsResultsOfQueryByName(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate.toISOString().slice(0, 10);
    console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

const queryByName = function queriesUserEnteredArgument(name) {
  // console.log(knex('famous_people').where('last_name', 'Lincoln')._single);
  // console.log(knex('famous_people').toString());
  // console.log(knex('famous_people').where('last_name', 'Lincoln').toString());
  knex
    .select('*')
    .from('famous_people')
    .where('last_name', 'like', `%${name}%`)
    // .where('first_name', 'like', `%${name}%`)
    // .orWhere('last_name', 'like', `%${name}%`)
    .asCallback((err, rows) => {
      if (err) {
        return console.error(err);
      }
      displayQueryByName(rows);
    });
  knex.destroy();
};

queryByName(arg);
