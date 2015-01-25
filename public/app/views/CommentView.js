App.CommentView = Backbone.View.extend({
  render: function() {
    var template = _.template($('#review-item').html());
    var data = {
      createdAt: (new Date(this.model.date)).toLocaleDateString(), 
      author: this.model.author,
      rating: this.model.rating,
      comment: this.model.body
    }
    this.$el.html(template({review: data}));
    return this;
  }
});