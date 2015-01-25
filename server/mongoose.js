var mongoose = require('mongoose');

module.exports = function(config) {
  
  mongoose.connect(config.db);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
    console.log('MongoDB opened at...', config.db);
  });

  // Register Models: 
  require('./models');

  // Seed Database(if empty): 
  var Restaurant = mongoose.model('Restaurant');
  seedDB();

  function seedDB() {
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
        for (var i = 0; i < seedData.length; i++) {
          if (Restaurant.create(seedData[i]));
        }
      }
    });
  }
}
