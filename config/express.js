var passport = require('../lib/middleware/passport');
var redirectIfLoggedIn = require('../lib/middleware/redirectIfLoggedIn');

module.exports.express = {
  customMiddleware: function (app) {
    passport.customMiddleware(app);
    redirectIfLoggedIn.customMiddleware(app);
  }
};