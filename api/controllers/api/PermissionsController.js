/**
 * PermissionsController
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

var Q = require('q');

module.exports = {

  create: function(req, res, next) {
    // current user: need to check that they have manage permission
    var currentUser = req.user;

    // the person we're granted permission for
    var targetUsername = req.body.username;
    var targetPermission = req.body.permission;

    // grantPermissionToUser
    // revokePermissionForUser


    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var listName = params.name;
    var listDescription = params.description;
    var username = req.user.username;
    var createdBy = username;
    var groupName = "tenant_" + createdBy + "_" + getRandomInt(1,10000).toString();

    StormpathService.createListForUser(groupName, username).done(function(group){
      //if (err) return res.send(err,500);

      var tokens = group.href.split("/");
      var tenantId = tokens[tokens.length - 1];

      var newList = {
        name: listName,
        description: listDescription,
        createdBy: createdBy,
        tenantId: tenantId
      };

      List.create(newList, function listCreated(err, list) {
        if (err) return res.send(err, 500);
        res.json(list);
      });
    });
  },

  destroy: function(req, res, next){

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListsController)
   */
  _config: {}
  
};
