var controllers = require('./controllers');
module.exports = function(app) {

  // Restaraunts
  app.get('/api/restaraunts', controllers.getRestaraunts);
  app.get('/api/restaraunts/:id', controllers.getRestaraunt);
  app.put('/api/restaraunts/:id', controllers.updateRestaraunt);
  app.post('/api/restaraunts', controllers.createRestaraunt);
  app.delete('/api/restaraunts/:id', controllers.deleteRestaraunt);

  //Comments
  app.post('/api/comments', controllers.addComment);
};