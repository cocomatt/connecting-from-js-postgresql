'use strict';

const settings = require('./settings.json');

module.exports = {

  development: {
    client: 'pg',
    connection: settings,
  },
};
