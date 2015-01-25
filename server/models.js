var mongoose = require('mongoose');

var restarauntSchema = mongoose.Schema({
  name: {type: String, unique: true},
  description: String,
  // default to -1: once a review is submitted it can be reset to 1-5
  score: {type: Number, default: -1}
});

mongoose.model('Restaraunt', restarauntSchema);