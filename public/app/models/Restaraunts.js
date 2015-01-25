App.RestarauntModel = Backbone.Model.extend({
  urlRoot: '/api/restaraunts'
});

App.RestarauntsCollection = Backbone.Collection.extend({
  url: '/api/restaraunts',
  model: App.RestarauntModel
});