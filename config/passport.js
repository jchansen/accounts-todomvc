//var passport = require('passport'),
//    LocalStrategy = require('passport-local').Strategy,
//    bcrypt = require('bcrypt');
//
//passport.serializeUser(function (user, done) {
//  done(null, user.id);
//});
//
//passport.deserializeUser(function (id, done) {
//  User.findOneById(id, function (err, user) {
//    done(err, user);
//  });
//});
//
//passport.use(new LocalStrategy(
//    function (username, password, done) {
//      User.findOneByUsername(username).done(function (err, user) {
//        if (err) {
//          return done(null, err);
//        }
//        if (!user) {
//          return done(null, false, { message: 'No account under that username'});
//        }
//        bcrypt.compare(password, user.password, function (err, res) {
//          if (!res) return done(null, false, { message: 'Invalid password'});
//          return done(null, user);
//        });
//      });
//    })
//);
//
//module.exports = {
//  express: {
//    customMiddleware: function (app) {
//      console.log('express midleware for passport');
//      app.use(passport.initialize());
//      app.use(passport.session());
//      app.use(function(req, res, next){
//        res.locals.user = req.user;
//        next();
//      });
//    }
//  }
//};