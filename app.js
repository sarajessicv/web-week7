require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var JwtStrategy = require('passport-jwt').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

app.use(passport.initialize());

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', passport.authenticate('jwt', {session: false}), indexRouter);
app.use('/api/user', usersRouter);

module.exports = app;
