'use strict';

var express = require('express');
var app = express();
//var io = require('./io');

var api = require('../routes/api_routes');
app.use('/api', api);

var port = process.env.PORT || 3000;

app.listen(port, function() {
   console.log('Listening on ' + port);
});

