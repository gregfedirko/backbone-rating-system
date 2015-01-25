App.RestarauntListView = Backbone.View.extend({
  el: '.page',
  render: function() {
    var that = this;
    var restaraunts = new App.RestarauntsCollection();
    restaraunts.fetch({
      success: function(data) {
        var template = _.template($('#restaraunt-list').html());
        console.log(data.models);
        that.$el.html(template({data: data.models}));
      }
    });
  }
});