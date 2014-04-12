/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
    'app'
  ],
  function (Marionette, template, app) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,

      events: {
        'click span': 'onShowUsers'
      },

      initialize: function(options){
        var x = 2;
      },

      onShowUsers: function(e){
        e.preventDefault();
        app.commands.execute('openTodoListAdminPanel', this.options.listName);
      }
    });
  });
