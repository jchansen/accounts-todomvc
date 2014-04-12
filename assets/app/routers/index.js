/*global define */

define(
  [
    'marionette',
    'underscore',
    'app',
    'q',

    'modules/header/Module',
    'modules/content/Module',
    'modules/footer/Module'
  ],
  function (Marionette, _, app, Q, HeaderModule, ContentModule, FooterModule) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        '': 'showContent'
      }
    });

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {

      },

      showContent: function (param) {
        var self = this;
        Q.all([
            (new HeaderModule()).render(app.header),
            (new ContentModule()).render(app.content),
            (new FooterModule()).render(app.footer)
          ]).done(function () {
            self.setFilter(param);
            self.setSortingFilter('date');
          });
      },

      setFilter: function (param) {
        app.vent.trigger('todoList:filter', param && param.trim() || '');
      },

      setSortingFilter: function (param) {
        app.vent.trigger('todoList:sort', param && param.trim() || 'date');
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
