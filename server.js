var express = require('express');
var app = express();




require('./server/mongoose');

require('./server/router')(app);

app.use(express.static('public'));

var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);