var controllers = require('./controllers');
module.exports = function(app) {

  // Restaurants
  app.get('/api/restaurants', controllers.getRestaurants);
  app.get('/api/restaurants/:id', controllers.getRestaurant);
  app.put('/api/restaurants/:id', controllers.updateRestaurant);
  app.post('/api/restaurants', controllers.createRestaurant);
  app.delete('/api/restaurants/:id', controllers.deleteRestaurant);

  //Comments
  app.post('/api/comments', controllers.addComment);
};