var controllers = require('./controllers');
module.exports = function(app) {

  // Restaraunts
  app.get('/api/restaraunts', controllers.getRestaraunts);
  app.get('/api/restaraunts/:id', controllers.getRestaraunt);


  // Serve up index.html as a default 
  app.get('*', function(req, res) {
    res.send('/public/index.html');
  });
};