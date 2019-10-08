const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
// uncomment to use ensureAuth on routes
// const ensureAuth = require('./middleware/ensure-auth');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

app.use(checkConnection);

// API ROUTES
const auth = require('./routes/auth');
const zips = require('./routes/zips-route');
const students = require('./routes/students-route');
const grades = require('./routes/grades-route');
const books = require('./routes/books-route');
const trades = require('./routes/trades-route');

app.use('/api/auth', auth);
app.use('/api/zips', zips);
app.use('/api/students', students);
app.use('/api/grades', grades);
app.use('/api/books', books);
app.use('/api/trades', trades);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;