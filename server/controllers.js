var mongoose = require('mongoose');
var Restaraunt = mongoose.model('Restaraunt');


exports.getRestaraunts = function(req, res) {
  Restaraunt.find({}).exec(function(err, collection) {
    res.json(collection);
  });
};
