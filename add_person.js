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

const firstNameToAdd = process.argv[2].toString().toLowerCase().charAt(0).toUpperCase() + process.argv[2].toString().toLowerCase().slice(1);
const lastNameToAdd = process.argv[3].toString().toLowerCase().charAt(0).toUpperCase() + process.argv[3].toString().toLowerCase().slice(1);
const dateOfBirthToAdd = process.argv[4].toString();

console.log(firstNameToAdd);
console.log(lastNameToAdd);
console.log(dateOfBirthToAdd);

function displayQuery(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate.toISOString().slice(0, 10);
    console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

function insertPerson(firstNameToAdd, lastNameToAdd, dateOfBirthToAdd) {
  return knex.insert({
    first_name: `${firstNameToAdd}`,
    last_name: `${lastNameToAdd}`,
    birthdate: `${dateOfBirthToAdd}`,
  })
    .into('famous_people')
    .catch(function(error) {
      console.error(error);
    }).then(function() {
      return knex.select('*')
        .from('famous_people');
    }).then(function(rows) {
      displayQuery(rows);
    })
    .catch(function(error) {
      console.error(error);
    })
    .finally(() => knex.destroy());
};

insertPerson(firstNameToAdd, lastNameToAdd, dateOfBirthToAdd);
