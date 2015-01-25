var MONGO_URI = process.env.MONGO_URI;

module.exports = {
  development: {
    db: 'mongodb://localhost/rating_system',
    port: process.env.PORT || 3030

  }, 
  production: {
    db: MONGO_URI,
    port: process.env.PORT || 80
  },
  test: {
    db: 'mongodb://localhost/rating_system_test',
    port: 9000
  }
}