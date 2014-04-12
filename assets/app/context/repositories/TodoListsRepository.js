define(
  [
    'context/BackboneRepository',
    'collections/TodoLists',
    'context/loggers/RepositoryLogger',
    'globals',
    'q',
    'collections/Users'
  ],
  function (BackboneRepository, TodoLists, RepositoryLogger, globals, Q, Users) {

    var Repository = BackboneRepository.extend({
      _collectionType: TodoLists,

      initialize: function (options) {
        BackboneRepository.prototype.initialize.apply(this, arguments);
        this.logger = new RepositoryLogger({
          plural: "todoLists",
          singular: "todoList",
          repository: this,
          description: function(model){
            return model.get('name');
          }
        });
      },

      getUsersForTodoList: function(options){
        var defer = Q.defer();
        var listName = options.listName;
        var users = new Users();
        users.fetch({
          url: globals.API_ROOT_URL + "/api/lists/" + listName + "/users"
        })
          .done(function(){
            defer.resolve(users);
          });
        return defer.promise;
      },

      getByName: function (name, options) {
        var that = this;
        var deferred = $.Deferred();
        this._promise.done(function (model, response, options) {
          var model = that._collection.findWhere({tenantName: name});
          if (model === null) throw "No model found with given name";
          deferred.resolve(model);
        }, this);
        return deferred.promise();
      }

    });

    return Repository;
  });