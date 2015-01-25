var App = {
  init: function() {

    App.restarauntListView = new App.RestarauntListView();
    App.editRestarauntView = new App.EditRestarauntView();
    App.restarauntDetailView = new App.RestarauntDetailView();

    // router: 
    App.router = new App.Router();
    App.router.on('route:home', function() {
      App.restarauntListView.render();
    });
    App.router.on('route:editRestaraunt', function(id) {
      App.editRestarauntView.render({id:id});
    });
    App.router.on('route:detailRestaraunt', function(id) {
      App.restarauntDetailView.render({id:id});
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
    'new': 'editRestaraunt',
    'edit/:id': 'editRestaraunt',
    'detail/:id': 'detailRestaraunt'
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