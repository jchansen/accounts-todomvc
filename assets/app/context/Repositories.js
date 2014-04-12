define(
  [
    'marionette',
    './repositories/TodosRepository',
    './repositories/TodoListsRepository',
    './repositories/UsersRepository'
  ],
  function (Marionette, TodosRepository, TodoListsRepository, UsersRepository) {

    var Repositories = Marionette.Controller.extend({

      _todos: null,
      Todos: function () {
        if (this._todos === null) {
          this._todos = new TodosRepository();
        }
        return this._todos;
      },

      _todoLists: null,
      TodoLists: function () {
        if (this._todoLists === null) {
          this._todoLists = new TodoListsRepository();
        }
        return this._todoLists;
      },

      _users: null,
      Users: function () {
        if (this._users === null) {
          this._users = new UsersRepository();
        }
        return this._users;
      }

    });

    return Repositories;
  });