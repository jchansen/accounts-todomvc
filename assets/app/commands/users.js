define(
  [
    'app',
    'q'
  ],
  function (app, Q) {

    var commands = function () {
      var _modelName = 'user';
      var _repo = app.Repositories.Users();

      app.commands.setHandler(_modelName + ":create", function (model) {
        _repo.add(model);
      });

      app.commands.setHandler(_modelName + ":update", function (model) {
        _repo.update(model);
      });

      app.commands.setHandler(_modelName + ":delete", function (model) {
        _repo.remove(model);
      });

    };

    var requests = function(){

      app.reqres.setHandler("users", function () {
        var defer = Q.defer();
        app.Repositories.Users().getAll().done(function (users) {
          defer.resolve(users);
        });
        return defer.promise;
      });

      app.reqres.setHandler("user", function (username) {
        var defer = Q.defer();
        app.Repositories.Users().getById(username).done(function (users) {
          defer.resolve(users);
        });
        return defer.promise;
      });

      app.reqres.setHandler("todoListsForUser", function (username) {
        var defer = Q.defer();
        app.Repositories.Users().getTodoListsForUser({username: username})
          .done(function (todoLists) {
            defer.resolve(todoLists);
        });
        return defer.promise;
      });

    };

    app.on("initialize:before", function () {
      commands();
      requests();
    });

  });