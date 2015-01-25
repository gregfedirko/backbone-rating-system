var App = {
  init: function() {

    App.restarauntListView = new App.RestarauntListView();

    // router: 
    App.router = new App.Router();
    App.router.on('route:home', function() {
      App.restarauntListView.render();
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
  }
});