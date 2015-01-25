App.RestaurantListView = Backbone.View.extend({
  el: '.page',
  render: function() {
    var that = this;
    var restaurants = new App.RestaurantsCollection();
    restaurants.fetch({
      success: function(data) {
        var template = _.template($('#restaurant-list').html());
        that.$el.html(template({data: data.models}));
      }
    });
  }
});