define(
  [
    'app',
    'q',
    'backbone'
  ],
  function (app, Q, Backbone) {

    function getListName(){
      var tokens = Backbone.history.getHash().split('/');
      var listTenantName = tokens[tokens.length - 1];
      return listTenantName;
    }

    var commands = function () {
      var _modelName = 'todo';
      var _repo = app.Repositories.Todos();

      app.commands.setHandler(_modelName + ":create", function (model) {
        app.reqres.request("todoList:byName", getListName()).done(function(list){
          model.set('listId', list.id);
            _repo.add(model);
          });
      });

      app.commands.setHandler(_modelName + ":update", function (model) {
        _repo.update(model);
      });

      app.commands.setHandler(_modelName + ":delete", function (model) {
        _repo.remove(model);
      });

    };

    var requests = function(){

      app.reqres.setHandler("todos", function () {
        var listTenantName = getListName();

        var defer = Q.defer();
        app.Repositories.Todos().getTodosForList({listName: listTenantName}).done(function (todos) {
          defer.resolve(todos);
        });
        return defer.promise;
      });

    };

    app.on("initialize:before", function () {
      commands();
      requests();
    });

  });