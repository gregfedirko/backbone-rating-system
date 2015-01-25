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

exports.updateRestaraunt = function(req, res) {
  Restaraunt.findOne({_id: req.params.id}, function(error, item) {
    item.name = req.body.name;
    item.description = req.body.description;
    item.save(function(err, data) {
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
  });
};