	'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'makeupsomethingelse';

var entryRoutes = express.Router();
var userRoutes = express.Router();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/entries_dev');

app.use(passport.initialize());
require('./passport_strat')(passport);

app.use(express.static('build'));

require('../routes/api_routes')(entryRoutes);
require('../routes/auth_routes')(userRoutes, passport);

app.use('/api', entryRoutes);
app.use('/user', userRoutes);

var port = process.env.PORT || 3001;

app.listen(port, function() {
   console.log('Listening on ' + port);
});

