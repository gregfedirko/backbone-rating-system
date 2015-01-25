App.EditRestaurantView = Backbone.View.extend({
  el: '.page',
  render: function(options) {
    var template = _.template($('#edit-restaurant').html());
    var that = this;

    if (options.id) {
      that.restaurant = new App.RestaurantModel({id: options.id});
      that.restaurant.fetch({
        success: function(data) {
          that.$el.html(template({restaurant: data}));
        }
      });
    } else {
      that.$el.html(template({restaurant: null}));
    }
  }, 
  events: {
    'submit .edit-restaurant-form': 'saveRestaurant',
    'click .delete': 'deleteRestaurant'
  },

  saveRestaurant: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeObject();
    var restaurant = new App.RestaurantModel();
    restaurant.save(data, {
      success: function() {
        App.router.navigate('', {trigger: true});
      }
    })

  },
  deleteRestaurant: function(event) {
    event.preventDefault();
    this.restaurant.destroy({
      success: function() {
        App.router.navigate('', {trigger: true});
      }
    });

  }
});