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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

  index: function(req, res, next){
    //get user
    var user = req.user;
    // get all lists
      // where tenant
        // has account
          // belonging to user


    StormpathService.getGroupMembershipsForUsername(user.username)
      .done(function membershipsRetrieved(memberships){

        var tenantIds = [];
        _.each(memberships, function(m){
          var tokens = m.group.href.split('/');
          var tenantId = tokens[tokens.length - 1];
          tenantIds.push(tenantId);
        });

        List.findByTenantIdIn(tenantIds, function listsFound(err, lists) {
          if (err) return res.send(err, 500);
          res.json(lists);
        });
    });

//    StormpathService.getAllLists()
//      .done(function(lists){
//        res.json(lists);
//      });
  },

  find: function(req, res, next) {
    var listName = req.param('id');
    StormpathService.getListByName(listName)
      .done(function(list){
        res.json(list);
      });
  },

  create: function(req, res, next) {
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

  getTodosFromList: function(req, res, next){
    var tenantName = req.param('listName');
    List.findOneByTenantName(tenantName, function listFound(err, list){
      if(err) res.send(err, 500);

      Todo.findByListId(list.id, function todosFound(err, todos){
        if(err) res.send(err, 500);

        res.json(todos);
      })
    });
  },

  // Collection methods
  getUsersForList: function(req, res, next){
    var listName = req.param('id');
    StormpathService.getUsersForList(listName)
      .done(function(users){
        res.json(users);
      });
  },

  addUserToList: function(req, res, next){
    var listName = req.param('listName');
    var username = req.param('username');
    StormpathService.addUserToList(listName, username)
      .done(function(user){
        res.json(user);
      });
  },

  removeUserFromList: function(req, res, next){
    var listName = req.param('listName');
    var username = req.param('username');
    StormpathService.removeUserFromList(listName, username)
      .done(function(){
        res.send(204);
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListsController)
   */
  _config: {}
  
};
