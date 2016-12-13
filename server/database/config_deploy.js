const mysql = require('mysql');

const DBconfig = require('./config.js') || {};

const connection = mysql.createConnection({
  host: DBconfig.host || process.env.DB_HOST,
  user: DBconfig.user || process.env.DB_USER,
  password: DBconfig.password || process.env.DB_PASSWORD,
  database: DBconfig.database || process.env.DB_DATABASE,
});

module.exports = connection;
