var express = require('express');
var app = express();



app.use(express.static('public'));

require('./server/mongoose');

require('./server/router')(app);


var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);