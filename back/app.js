const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const vilkaRouter = require('./routes/vilka');
const categoryRouter = require('./routes/category');
const subsRouter = require('./routes/subscribes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use()

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/vilka', vilkaRouter);
app.use('/category', categoryRouter);
app.use('/subs', subsRouter);

module.exports = app;
