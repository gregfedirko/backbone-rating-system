module.exports = function(app) {

  // Restaraunts


  // Serve up index.html as a default 
  app.get('*', function(req, res) {
    res.send('/public/index.html');
  });
};