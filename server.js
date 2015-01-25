var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config')[env];

require('./server/mongoose')(config);

require('./server/router')(app);

app.use(express.static('public'));

var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);