App.CommentFormView = Backbone.View.extend({
  render: function() {
    var template = _.template($('#comment-form-view').html());
    this.$el.html(template());
    return this;
  }
});

