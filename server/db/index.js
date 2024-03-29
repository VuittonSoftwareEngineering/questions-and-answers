require('dotenv').config();
const Pool = require('pg').Pool;

const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
});

module.exports = db;