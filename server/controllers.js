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

exports.createRestaraunt = function(req, res) {
  Restaraunt.create({
    name: req.body.name,
    description: req.body.description
  }, function(err, restaraunt) {
    if (err) {
      console.log(err);
      res.status(404);
      res.end();
      return;
    } 
    res.end('{"success" : "Created Successfully", "status" : 200}');
    
  });
};

exports.deleteRestaraunt = function(req, res) {
  Restaraunt.findOneAndRemove({_id: req.params.id}, function(err, item) {
    res.end('{"success" : "Deleted Successfully", "status" : 200}');
  });
};

exports.addComment = function(req, res) {
  Restaraunt.findOne({_id: req.body.restarauntID}, function(err, item) {
    if (err) {
      console.log(err);
    }
    console.log(item);
    var normalizedRating = Number(item.rating)
    if ( (typeof normalizedRating !== "number") || (normalizedRating < 1) || (normalizedRating > 5)) {
      res.status(404);
      res.end();
      return;
    } 

    item.reviews.push({
      author: req.body.author, 
      body: req.body.comment,
      rating: req.body.rating
    });

    var reviewSum = 0;
    var reviewCount = 0;
    for (var i = 0; i < item.reviews.length; i++) {
      reviewSum += item.reviews[i].rating;
      reviewCount++;
    }

    item.score = (reviewCount > 0) ? (reviewSum/reviewCount).toFixed(1) : 0;

    item.save(function(err) {
      res.end();
    });
  });
}








