App.RestaurantDetailView = Backbone.View.extend({
  el: '.page',
  render: function(options) {
    var template = _.template($('#detail-view').html());
    var that = this;
    that.restaurant = new App.RestaurantModel({id: options.id});
    that.restaurant.fetch({
      success: function(data) {

        var page = $('<div></div>');

        page.append(template({restaurant: data}));

        var commentForm = new App.CommentFormView();

        var reviews = data.get('reviews');

        _.each(reviews, function(review) {
          var comment = new App.CommentView({model: review});
          page.append(comment.render().el);
        });

        page.append(commentForm.render().el)

        that.$el.html(page.html());
      }
    });
  },

  events: {
    'submit .comment-form': 'submitComment'
  },
  submitComment: function(event) {
    event.preventDefault();
    console.log('submit the comment from parent view');
    var data = $('.comment-form').serializeObject();
    data.restaurantID = this.restaurant.id;
    console.log(data);
    var that = this;
    $.ajax({
      type: 'POST',
      url: '/api/comments',
      data: data,
      success: function(data) {
        console.log('success');
        App.router.navigate('', {trigger: true});
      },
      error: function(){
        console.log("error");
      }
     });
  }
});