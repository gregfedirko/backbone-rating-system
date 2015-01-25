var express = require('express');
var app = express();



app.use(express.static('public'));
app.get('*', function(req, res) {
  res.send('public/index.html');
});


var port = process.env.PORT || 3030;

app.listen(port);
console.log('listening on port...' + port);