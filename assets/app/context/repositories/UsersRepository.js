define(
  [
    'context/BackboneRepository',
    'collections/Users',
    'context/loggers/RepositoryLogger',
    'globals',
    'q',
    'collections/TodoLists'
  ],
  function (BackboneRepository, Users, RepositoryLogger, globals, Q, TodoLists) {

    var Repository = BackboneRepository.extend({
      _collectionType: Users,

      initialize: function (options) {
        BackboneRepository.prototype.initialize.apply(this, arguments);
        this.logger = new RepositoryLogger({
          plural: "users",
          singular: "user",
          repository: this,
          description: function(model){
            return model.get('username');
          }
        });
      },

      getTodoListsForUser: function(options){
        var defer = Q.defer();
        var username = options.username;
        var todoLists = new TodoLists();
        todoLists.fetch({
            url: globals.API_ROOT_URL + "/api/users/" + username + "/lists"
          })
          .done(function(){
            defer.resolve(todoLists);
          });
        return defer.promise;
      }

    });

    return Repository;
  });