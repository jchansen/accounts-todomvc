define(
  [
    'context/BackboneRepository',
    'collections/Todos',
    'context/loggers/RepositoryLogger',
    'globals',
    'q'
  ],
  function (BackboneRepository, Todos, RepositoryLogger, globals, Q) {

    var Repository = BackboneRepository.extend({
      _collectionType: Todos,

      initialize: function (options) {
        // modifying initialize method because the base api/todos url
        // doesn't return anything (or anything meaningful if it did)
        //BackboneRepository.prototype.initialize.apply(this, arguments);
        this._collection = new this._collectionType();

        this.logger = new RepositoryLogger({
          plural: "todos",
          singular: "todo",
          repository: this,
          description: function(model){
            return model.get('title');
          }
        });
      },

      getTodosForList: function(options){
//        var defer = Q.defer();
        var listName = options.listName;
//        var todos = new Todos();
//        todos.fetch({
//            url: globals.API_ROOT_URL + "/api/lists/" + listName + "/todos"
//        })
//        .done(function () {
//          defer.resolve(todos);
//        });
//        return defer.promise;

        var options = {
          forceFetch: true,
          url: globals.API_ROOT_URL + "/api/lists/" + listName + "/todos"
        };

        return this.getAll(options);
      }

    });

    return Repository;
  });