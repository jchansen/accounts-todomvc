define(
  [
    'app',
    'q'
  ],
  function (app, Q) {

    var commands = function () {
      var _modelName = 'todoList';
      var _repo = app.Repositories.TodoLists();

      app.commands.setHandler(_modelName + ":create", function (model) {
        _repo.add(model);
      });

      app.commands.setHandler(_modelName + ":update", function (model) {
        _repo.update(model);
      });

      app.commands.setHandler(_modelName + ":destroy", function (model) {
        _repo.remove(model);
      });

    };

    var requests = function(){

      app.reqres.setHandler("todoLists", function (model) {
        var defer = Q.defer();
        app.Repositories.TodoLists().getAll().done(function (todoLists) {
          defer.resolve(todoLists);
        });
        return defer.promise;
      });

      app.reqres.setHandler("todoList", function (listName) {
        var defer = Q.defer();
        app.Repositories.TodoLists().getById(listName).done(function (todoList) {
          defer.resolve(todoList);
        });
        return defer.promise;
      });

      app.reqres.setHandler("todoList:byName", function (listName) {
        var defer = Q.defer();
        app.Repositories.TodoLists().getByName(listName).done(function (todoList) {
          defer.resolve(todoList);
        });
        return defer.promise;
      });

      app.reqres.setHandler("usersForTodoList", function (listName) {
        var defer = Q.defer();
        app.Repositories.TodoLists().getUsersForTodoList({listName: listName})
          .done(function (users) {
            defer.resolve(users);
          });
        return defer.promise;
      });

    };

    app.on("initialize:before", function () {
      commands();
      requests();
    });

  });