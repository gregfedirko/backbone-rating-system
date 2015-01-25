App.EditRestarauntView = Backbone.View.extend({
  el: '.page',
  render: function(options) {
    var template = _.template($('#edit-restaraunt').html());
    var that = this;

    if (options.id) {
      that.restaraunt = new App.RestarauntModel({id: options.id});
      that.restaraunt.fetch({
        success: function(data) {
          that.$el.html(template({restaraunt: data}));
        }
      });
    } else {
      that.$el.html(template({restaraunt: null}));
    }
  }, 
  events: {
    'submit .edit-restaraunt-form': 'saveRestaraunt',
    'click .delete': 'deleteRestaraunt'
  },

  saveRestaraunt: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeObject();
    var restaraunt = new App.RestarauntModel();
    restaraunt.save(data, {
      success: function() {
        App.router.navigate('', {trigger: true});
      }
    })

  },
  deleteRestaraunt: function(event) {
    event.preventDefault();
    this.restaraunt.destroy({
      success: function() {
        App.router.navigate('', {trigger: true});
      }
    });

  }
});