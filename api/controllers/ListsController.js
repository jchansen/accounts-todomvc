/**
 * ListsController
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
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListsController)
   */
  _config: {},

  index: function(req, res, next){
    var user = req.user;
    StormpathService.getTenantsForUser(user)
      .fail(function(error){
        throw error;
      })
      .done(function(groups){
        var tenants = groups.items;
        res.view({tenants: tenants});
      });
  },

  find: function(req, res, next){
    var listName = req.params['id'];
    var listPromise = StormpathService.getListByName(listName);
    var usersPromise = StormpathService.getUsersForList(listName);

    Q.all([listPromise, usersPromise])
      .done(function(result){
        res.view({list: result[0], users: result[1]});
      });
  }
  
};
