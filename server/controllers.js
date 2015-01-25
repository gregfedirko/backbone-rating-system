var mongoose = require('mongoose');
var Restaraunt = mongoose.model('Restaraunt');


exports.getRestaraunts = function(req, res) {
  Restaraunt.find({}).exec(function(err, collection) {
    res.json(collection);
  });
};


exports.getRestaraunt = function(req, res) {
  Restaraunt.findOne({_id: req.params.id}, function(error, item) {
    res.json(item);
  });
};