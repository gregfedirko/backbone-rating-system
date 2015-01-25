process.env.NODE_ENV = 'test';
var mongoose = require('mongoose');
var app = require('../server.js').getApp;
var async = require('async');

var request = require('supertest');
var chai = require('chai');

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

var Restaurant = mongoose.model('Restaurant');


describe('API', function() {
  beforeEach(function(done) {
    clearDB(function() {
      seedTestDB(done);
    });
  });

  describe('GET /api/restaurants', function() {

    it('should respond with json', function(done) {
      request(app)
        .get('/api/restaurants')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should 404', function(done) {
      request(app)
        .get('/api/restaurants/asdfasdfasdf')
        .expect(404, done);
    });

    it('should have a body containing an array', function(done) {
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          expect(results.body).to.be.instanceof(Array);
          done();
        });
    });

  });

  describe('GET /api/restaurants/:id', function() {
    it('should send an individual restaurant model', function(done) {
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          var id = results.body[0]._id;

          if (err) {
            console.log(err);
            done();
            return;
          } 

          request(app)
            .get('/api/restaurants/' + id)
            .end(function(err, response) {
              console.log(response.body);
              expect(response.body._id).to.equal(id);
              done();
            });
        });
    });
  });

  describe('PUT /api/restaurants/:id', function() {
    it('should update an existing model', function(done) { 
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          var id = results.body[0]._id;

          if (err) {
            console.log(err);
            done();
            return;
          } 

          request(app)
            .put('/api/restaurants/' + id)
            .send({name: 'FOO BAR'})
            .end(function(err, response) {
              expect(200);
              done();
            });
        });
    });
  });

  describe('POST /api/restaurants', function() {
    it('should create a new model', function(done) {
      request(app)
        .post('/api/restaurants')
        .send({name: 'FOO BAR'})
        .end(function(err, results) {

          if (err) {
            console.log(err);
            done();
            return;
          } 

          request(app)
            .get('/api/restaurants')
            .end(function(err, response) {
              // This is assuming the seed data had three items, it then checks for four.
              expect(response.body.length).to.equal(4);
              done();
            });
        });
    });
  });

  describe('DELETE /api/restaurants/:id', function() {
    it('delete a model', function(done) {
      // Get an id
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          var id = results.body[0]._id;
          var beforeLength = results.body.length;
          if (err) {
            console.log(err);
            done();
            return;
          } 
          // delete the id
          request(app)
            .delete('/api/restaurants/' + id)
            .end(function(err, response) {

              // check the new length
              request(app)
                .get('/api/restaurants')
                .end(function(err, results) {
                  var afterLength = results.body.length;

                  expect(afterLength).to.equal(beforeLength - 1);
                  done();
                });
            });
        });
    });
  });

  describe('POST /api/comments', function() {

    it('should add a comment', function(done) {
      // Get an id
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          var id = results.body[0]._id;
          if (err) {
            console.log(err);
            done();
            return;
          } 
          // add a comment
          request(app)
            .post('/api/restaurants')
            .send({
              author: "Test",
              comment: "Testing",
              rating: "5",
              restaurantID: id
            })
            .expect(200, done);
        
        });
    });


    it('should average ratings', function(done) {
      // Get an id:
      request(app)
        .get('/api/restaurants')
        .end(function(err, results) {
          var id = results.body[0]._id;
          if (err) {
            console.log(err);
            done();
            return;
          } 
          // add a comment
          request(app)
            .post('/api/comments')
            .send({
              author: "Test1",
              comment: "Testing",
              rating: "5",
              restaurantID: id
            })
            .end(function(err, response) {
              // add another comment
              request(app)
                .post('/api/comments')
                .send({
                  author: "Test2",
                  comment: "Testing",
                  rating: "3",
                  restaurantID: id
                })
                .end(function(err, response) {
                  // check the new rating
                  request(app)
                    .get('/api/restaurants/' + id)
                    .end(function(err, results) {
                      var newRating = results.body.score;
                      expect(newRating).to.equal(4);
                      done();
                    });

                });

            });
        });




    });
  });

});




// GET 
  // multiple
    // check error
    // should respond with an array all restaurants (without comments)
  // single
    // should get an individual restaurant with comments
// PUT
  // check error
  // should update a model
// POST
  // check error
  // should create a model
// DELETE
  // check error
  // should delete a model


// POST comment
  // check error
  // should add a rating
  // should average ratings
  // should reject invalid ratings



function clearDB(done) {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
  return done();
}

function writeRestaurant(obj, callback) {
  Restaurant.create(obj, function(err, item) {
    callback();
  });
};

function seedTestDB(done) {

  Restaurant.find({}).exec(function(err, collection) {
    if (err) {console.log(err);}
    if (collection.length === 0) {
      var seedData = [
        {
          name: 'Chipotle',
          description: 'A restaurant'
        },
        {
          name: 'Burger King',
          description: 'A restaurant'
        },
        {
          name: 'Pf Changs',
          description: 'A restaurant'
        }
      ];
      async.eachSeries(seedData, writeRestaurant, function() {
        done();
      });
    }
  });
}