var mongoose = require('mongoose');

var Review = mongoose.Schema({
  author: String,
  rating: Number,
  body: String, 
  date: {type: Date, default: Date.now()},
});

var restaurantSchema = mongoose.Schema({
  name: {type: String, unique: true},
  description: String,
  // default to -1: once a review is submitted it can be reset to 1-5
  score: {type: Number, default: -1},
  reviews: [Review]
});

mongoose.model('Restaurant', restaurantSchema);