require('dotenv').config();
// const pgp = require('pg-promise')();
const Pool = require('pg').Pool;

const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});
// console.log(process.env.DATABASE)

module.exports = db;