var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


require('./server/mongoose');

require('./server/router')(app);

app.use(express.static('public'));

var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);