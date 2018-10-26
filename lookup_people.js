const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.hostname,
  port : settings.port,
  ssl : settings.ssl
});

const arg = process.argv[2];

function queryByName(name) {
  const query = `SELECT * FROM famous_people WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%'`;
  return query;
};

function displayQueryByName(results) {
  results.forEach(function(val, index) {
    // console.log('val, ', val);
    // console.log('index, ', index);
    // console.log('results, ', results);
    // console.log('results[index]: ', results[index]);
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate.toISOString().slice(0,10);
     console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query(queryByName(arg), (err, result) => {
    // console.log(`arg: ${arg}, result: ${result}`);
    if (err) {
      return console.error('error running query', err);
    }
    console.log('Searching ...');
    console.log(`Found ${result.rowCount} person(s) by the name '${arg}':`);
    if (result.rowCount > 0) {
      // console.log('result.rows: ', result.rows);
      displayQueryByName(result.rows);
    } else {
      console.log('');
    }
    client.end();
  });
});
