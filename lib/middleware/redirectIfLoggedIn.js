var url = require('url');

module.exports = {
  customMiddleware: function (app) {
    console.log('express midleware for redirectIfLoggedIn');
    app.use(function(req, res, next){
      var action = url.parse(req.url);
      if(action.pathname === "/session/destroy") return next();
      if(req.user) {
        // base64 encode the user data to transmit as a query param
        var user = req.user;
        var userAsJsonString = JSON.stringify(user);
        var base64EncdodedUser = new Buffer(userAsJsonString).toString('base64');
        return res.redirect('//' + user.username + '.bonsaidigital.io' + '/session/callback?auth=' + base64EncdodedUser);
      }
      next();
    });
  }
};