var stormpath = require('stormpath'),
    Q = require('q');

var applicationURL = 'https://api.stormpath.com/v1/applications/5onePoMSC0FZAGyd48xrOJ';
var apiKeyId = process.env.STORMPATH_API_KEY_ID;
var apiKeySecret = process.env.STORMPATH_API_KEY_SECRET;
var apiKey = new stormpath.ApiKey(apiKeyId, apiKeySecret);

// objects required to interact with Stormpath
var client = new stormpath.Client({apiKey: apiKey});
var applicationPromise = null;

getApplication = function(){
  if(!applicationPromise){
    var defer = Q.defer();
    applicationPromise = defer.promise;
    client.getApplication(applicationURL, function(err, application){
      if (err) throw err;
      defer.resolve(application);
    });
  }
  return applicationPromise;
};

module.exports.getApplication = getApplication;

/**
 * List methods
 */

module.exports.getAllLists = function(){
  var defer = Q.defer();
  getApplication().done(function(application){
    application.getGroups({name: 'tenant_*'}, function(err, groups){
      defer.resolve(groups.items);
    });
  });
  return defer.promise;
};

function getListByName(listName){
  var defer = Q.defer();
  getApplication().done(function(application){
    application.getGroups({name: listName}, function(err, groups){
      if(groups.items.length < 1) throw "no group found with name: " + listName;
      if(groups.items.length > 1) throw "multiple groups found with name: " + listName;
      defer.resolve(groups.items[0]);
    });
  });
  return defer.promise;
};
module.exports.getListByName = getListByName;

module.exports.getListsForUser = function(username){
  var defer = Q.defer();
  getUserByUsername(username)
    .done(function(user){
      user.getGroups({name: "tenant_*"}, function(err, groups){
        if(err) throw err;
        defer.resolve(groups.items);
      });
    });
  return defer.promise;
};

module.exports.createListForUser = function(listName, username){
  var defer = Q.defer();
  // get the application
  applicationPromise.done(function(application){

    // create the group
    application.createGroup({name: listName}, function onGroupCreation(err, createdGroup){
      if (err) throw err;

      // get the users account
      getUserByUsername(username).done(function(account){

        // add account to group
        createdGroup.addAccount(account, function onMembershipCreated(err, membership){
          if (err) throw err;

          // add username to group
          defer.resolve(createdGroup);
        });
      });
    });
  });
  return defer.promise;
};

/**
 * User methods
 */

module.exports.getAllUsers = function(){
  var defer = Q.defer();
  getApplication().done(function(application){
    application.getAccounts(function(err, users){
      defer.resolve(users.items);
    });
  });
  return defer.promise;
};

function getUserByUsername(username){
  var defer = Q.defer();
  getApplication().done(function(application){
    application.getAccounts({username: username}, function(err, users){
      if(err) throw err;
      if(users.items.length < 1) throw "no user found with username: " + username;
      if(users.items.length > 1) throw "multiple users found with name: " + username;
      defer.resolve(users.items[0]);
    });
  });
  return defer.promise;
};
module.exports.getUserByUsername = getUserByUsername;

module.exports.getUsersForList = function(listName){
  var defer = Q.defer();
  getListByName(listName)
    .done(function(list){
      list.getAccounts(function(err, users){
        if(err) throw err;
        defer.resolve(users.items);
      });
    });
  return defer.promise;
};

/**
 * Membership methods
 */

module.exports.getGroupMembershipsForUsername = function(username){
  var defer = Q.defer();
  getUserByUsername(username).done(function(account){
    account.getGroupMemberships(function(err, memberships){
      if(err) throw err;
      defer.resolve(memberships.items);
    })
  });
  return defer.promise;
};

/**
 * Other stuff
 */

module.exports.getTenantGroupForUser = function(user){
  var defer = Q.defer();
  client.getAccount(user.href, function(err, account){
    account.getGroups({name: 'tenant_' + user.username}, function(err, groups){
      defer.resolve(groups);
    });
  });
  return defer.promise;
};

module.exports.getTenantsForUser = function(user){
  var defer = Q.defer();
  client.getAccount(user.href, function(err, account) {
    account.getGroups({name: 'tenant_*'}, function (err, groups) {
      defer.resolve(groups);
    });
  });
  return defer.promise;
};

module.exports.getGroupWithName = function(groupName){
  var defer = Q.defer();
  getApplication()
    .done(function(application){
      application.getGroups({name: groupName}, function(err, groups){
        if(groups.items.length < 1) throw "no groups found with that name";
        defer.resolve(groups.items[0]);
      })
    });
  return defer.promise;
};

module.exports.getUsersForGroup = function(group){
  var defer = Q.defer();
  client.getGroup(group.href, function(err, group){
    group.getAccounts(function(err, accounts){
      defer.resolve(accounts.items);
    })
  });
  return defer.promise;
};
