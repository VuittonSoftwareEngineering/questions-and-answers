// postgres or pg is a nonblocking PostgreSQL client, a collection of Node. js modules
// for interfacing with a PostgreSQL database

const Pool = require('pg').Pool;
require('dotenv').config();

// console.log(process.env.USER)
// console.log(process.env.HOST)
// console.log(process.env.DATABASE)
// console.log(process.env.PASSWORD)
// console.log(process.env.PORT)

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

module.exports = {
  getQuestions,
}