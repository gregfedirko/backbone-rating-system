var express = require('express');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var app = express();

var config = require('./server/config')[env];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



require('./server/mongoose')(config);

require('./server/router')(app);

app.use(express.static('public'));

var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);

module.exports.getApp = app;