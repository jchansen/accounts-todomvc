/*global define */

define(
  [
    'marionette',
    'underscore',
    'app',
    'q',

    'modules/header/Module',
    'modules/users/Module',
    'modules/footer/Module',
    'modules/user/Module'
  ],
  function (Marionette, _, app, Q, HeaderModule, UsersModule, FooterModule, UserModule) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        'users': 'showAllUsers',
        'users/:username': 'showUser'
      }
    });

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {

      },

      showAllUsers: function () {
        var self = this;
        Q.all([
            (new HeaderModule()).render(app.header),
            (new UsersModule()).render(app.content),
            (new FooterModule()).render(app.footer)
          ]).done();
      },

      showUser: function (username) {
        var self = this;
        Q.all([
          (new HeaderModule()).render(app.header),
          (new UserModule({username: username})).render(app.content),
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
