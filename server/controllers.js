var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');


exports.getRestaurants = function(req, res) {
  Restaurant.find({}).exec(function(err, collection) {
    if (err) {
      handleError(err, res);
      return;
    }
    res.json(collection);
  });
};

exports.getRestaurant = function(req, res) {
  Restaurant.findOne({_id: req.params.id}, function(err, item) {
    if (err) {
      handleError(err, res);
      return;
    }
    res.json(item);
  });
};

exports.updateRestaurant = function(req, res) {
  Restaurant.findOne({_id: req.params.id}, function(err, item) {
    if (err) {
      handleError(err, res);
      return;
    }
    item.name = req.body.name;
    item.description = req.body.description;
    item.save(function(err, data) {
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    })
  });
};

exports.createRestaurant = function(req, res) {
  Restaurant.create({
    name: req.body.name,
    description: req.body.description
  }, function(err, restaurant) {
    if (err) {
      handleError(err, res);
      return;
    }
    res.end('{"success" : "Created Successfully", "status" : 200}');
    
  });
};

exports.deleteRestaurant = function(req, res) {
  Restaurant.findOneAndRemove({_id: req.params.id}, function(err, item) {
    if (err) {
      handleError(err, res);
      return;
    }
    res.end('{"success" : "Deleted Successfully", "status" : 200}');
  });
};

exports.addComment = function(req, res) {
  Restaurant.findOne({_id: req.body.restaurantID}, function(err, item) {
    if (err) {
      handleError(err, res);
      return;
    }
    var normalizedRating = Number(item.rating)
    if ( (typeof normalizedRating !== "number") || (normalizedRating < 1) || (normalizedRating > 5)) {
      var err = new Error('Invalid rating');
      handleError(err, res);
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


function handleError(err, res) {
  console.log(err);
  res.status(404);
  res.end();
}







