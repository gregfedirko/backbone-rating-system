App.RestaurantModel = Backbone.Model.extend({
  urlRoot: '/api/restaurants'
});

App.RestaurantsCollection = Backbone.Collection.extend({
  url: '/api/restaurants',
  model: App.RestaurantModel
});