/*global define */

define(
  [
    'marionette',
    'underscore',
    'app',
    'q',

    'modules/header/Module',
    'modules/todoLists/Module',
    'modules/footer/Module',
    'modules/todoList/Module',
    'modules/todoListsGridView/Module',
    'modules/notepad/Module'
  ],
  function (Marionette, _, app, Q, HeaderModule, TodoListsModule, FooterModule, TodoListModule, TodoListsGridModule, NotepadModule) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        'lists': 'showAllLists',
        'lists/:listName': 'showList'
      }
    });

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {

      },

      showAllLists: function (param) {
        var self = this;
        Q.all([
            (new HeaderModule()).render(app.header),
            //(new TodoListsModule()).render(app.content),
            (new TodoListsGridModule()).render(app.content),
            (new FooterModule()).render(app.footer)
          ]).done();
      },

      showList: function (listName) {
        var self = this;
        Q.all([
          (new HeaderModule()).render(app.header),
          (new TodoListModule({listName: listName})).render(app.content),
          //(new NotepadModule({listName: listName})).render(app.content),
          (new FooterModule()).render(app.footer)
        ]).done();
      }

    });

    app.addInitializer(function () {
      var controller = new Controller();
      controller.initialize();
      controller.router = new Router({
        controller: controller
      });
    });

  });
