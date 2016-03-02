/* global __dirname */
var express = require('express'),
    app = express();
var fs = require('fs');
var path = require('path');

app.set('port', 8080);

// hide express
app.disable('x-powered-by');

// common static stuff
app.use('/', express.static(__dirname));

// start server
app.listen(app.get('port'));
console.log('Listen on 8080');


