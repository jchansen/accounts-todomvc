/*global define */

define(
  [
    'marionette',
    'app',

    'modals/signIn/View',
    'modals/spinner/View',
    'modules/admin/Module',
    'modules/admin/View'
  ],
  function (Marionette, app, SignInView, AppLockView, AdminModule, AdminView) {
    'use strict';

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {
        app.commands.setHandler('user:signIn', this.showUserSignIn);
        app.commands.setHandler('app:lock', this.lockApplication);
        app.commands.setHandler('app:unlock', this.unlockApplication);
        app.commands.setHandler('openTodoListAdminPanel', this.showTodoListUsers);
      },

      showUserSignIn: function () {
        var view = new SignInView();
        app.modal.show(view);
      },

      lockApplication: function(){
        var view = new AppLockView();
        app.appLock.show(view);
      },

      unlockApplication: function(){
        app.appLock.close();
      },

      showTodoListUsers: function(listName){
        // note: modules meant to be used as modals can't have a loading
        // view at the base module.  It cases the modal to be rendered twice.
        // Better approach: wrap the module in an empty view and display the
        // loading view inside of that (like a modal modal layout)
        var module = new AdminModule({listName: listName});
        module.render(app.modal);

//        var view = new AdminView();
//        app.modal.show(view);

//        app.reqres.request("usersForTodoList", listName).done(function(users){
//          var view = new AdminView({collection: users});
//          app.modal.show(view);
//        });
      }

    });

    app.addInitializer(function () {
      var controller = new Controller();
      controller.initialize();
    });

  });
