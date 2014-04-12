/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');
var passport = require('passport');

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {},

  new: function(req, res){
    res.view();
  },

  create: function(req, res, next){
//    passport.authenticate('stormpath', {
//      successRedirect: '/',
//      failureRedirect: '/session/new',
//      failureFlash: true
//    })(req, res, next);

    passport.authenticate('stormpath', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/session/new'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        // base64 encode the user data to transmit as a query param
        var userAsJsonString = JSON.stringify(user);
        var base64EncdodedUser = new Buffer(userAsJsonString).toString('base64');
        return res.redirect('//' + user.username + '.bonsaidigital.io' + '/session/callback?auth=' + base64EncdodedUser);
      });
    })(req, res, next);
  },

  destroy: function(req, res, next){
    req.logout();
    res.redirect('/');
  }

};
