var passport = require('passport'),
    StormpathStrategy = require('../lib/passport-stormpath').Strategy;

passport.serializeUser(function (user, done) {
  // serialize the entire object into the session
  // todo: serialize into an in-memory store or redis
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // since the user is already in the session just pass it through
  done(null, user);
});

passport.use(new StormpathStrategy({
      applicationURL: 'https://api.stormpath.com/v1/applications/5onePoMSC0FZAGyd48xrOJ',
      apiKeyId: process.env.STORMPATH_API_KEY_ID,
      apiKeySecret: process.env.STORMPATH_API_KEY_SECRET
    })
);

module.exports = {
  express: {
    customMiddleware: function (app) {
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session({
        domain:'.bonsaidigital.co'
      }));
      app.use(function(req, res, next){
        res.locals.user = req.user;
        next();
      });
    }
  }
};