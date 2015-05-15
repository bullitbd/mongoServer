'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var entriesRouter = express.Router();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/entries_dev');

var apiRoutes = require('../routes/api_routes');

apiRoutes(entriesRouter);

app.use('/api', entriesRouter); // was apiRoutes

var port = process.env.PORT || 3001;

app.listen(port, function() {
   console.log('Listening on ' + port);
});

