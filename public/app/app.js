var App = {
  init: function() {

    App.restaurantListView = new App.RestaurantListView();
    App.editRestaurantView = new App.EditRestaurantView();
    App.restaurantDetailView = new App.RestaurantDetailView();

    // router: 
    App.router = new App.Router();
    App.router.on('route:home', function() {
      App.restaurantListView.render();
    });
    App.router.on('route:editRestaurant', function(id) {
      App.editRestaurantView.render({id:id});
    });
    App.router.on('route:detailRestaurant', function(id) {
      App.restaurantDetailView.render({id:id});
    });

  }, 
  start: function() {
    App.init();
    Backbone.history.start();
  }
};

App.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'new': 'editRestaurant',
    'edit/:id': 'editRestaurant',
    'detail/:id': 'detailRestaurant'
  }
});


// jQuery addon for zipping up forms:

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};