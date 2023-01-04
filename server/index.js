const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const router = require ('./routers');

const app = express();
const port = process.env.PORT;

// const db = require('./queries');

router.use(cors({
  origin: 'http://localhost/',
  methods: ['GET', 'POST', 'PUT'],
  maxAge: '1h'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

app.listen(port, () => {
   console.log(`App running on http://localhost:${port}`)
});

// app.get('/', (req, res) => {
//   res.json({ info: 'Welcome to Node.js, Express, and Postgres API' })
// });