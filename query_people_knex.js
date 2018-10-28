'use strict';

const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl,
  },
});

const arg = process.argv[2].toString();
console.log(arg);

function displayQueryByName(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate.toISOString().slice(0, 10);
    console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

function queryByName(name) {
  knex
    .select('*')
    .from('famous_people')
    .where('first_name', 'like', `%${name}%`)
    .orWhere('last_name', 'like', `%${name}%`)
    .then(function(rows) {
      displayQueryByName(rows);
    })
    .catch(function(error) {
      console.error(error);
    })
    .finally(() => knex.destroy());
};

queryByName(arg);
