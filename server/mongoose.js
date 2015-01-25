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
  var Restaraunt = mongoose.model('Restaraunt');
  seedDB();

  function seedDB() {
    Restaraunt.find({}).exec(function(err, collection) {
      if (err) {console.log(err);}
      if (collection.length === 0) {
        var seedData = [
          {
            name: 'Chipotle',
            description: 'A restaraunt'
          },
          {
            name: 'Burger King',
            description: 'A restaraunt'
          },
          {
            name: 'Pf Changs',
            description: 'A restaraunt'
          }
        ];
        for (var i = 0; i < seedData.length; i++) {
          if (Restaraunt.create(seedData[i]));
        }
      }
    });
  }
}
