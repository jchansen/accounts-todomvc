/**
 * Module dependencies.
 */
var passport = require('passport-strategy'),
    util = require('util'),
    stormpath = require('stormpath'),
    lookup = require('./utils').lookup;

function Strategy(options, verify) {
  options = options || {};

  // extract the values for username/password in the user model
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';

  // Stormpath configuration
  this.applicationURL = options.applicationURL || ''; // todo: throw error if not provided
  var STORMPATH_API_KEY_ID = options.apiKeyId || ''; // todo: throw error if not provided
  var STORMPATH_API_KEY_SECRET = options.apiKeySecret || ''; // todo: throw error if not provided
  var apiKey = new stormpath.ApiKey(STORMPATH_API_KEY_ID, STORMPATH_API_KEY_SECRET);

  this.client = new stormpath.Client({apiKey: apiKey});
  this.name = 'stormpath';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);

  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }

  var self = this;
  try {
    this.client.getApplication(this.applicationURL, function(err, application){
      if (err) throw err;

      var authRequest = {
        username: username,
        password: password
      };

      application.authenticateAccount(authRequest, function(err, result, info) {
        if (err) { return self.fail(err); }

        //this is cached and will execute immediately (no server request):
        result.getAccount(function(err2, account) {
          if(err2) throw err2;
          self.success(account);
        });
      });

    });
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;