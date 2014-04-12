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

      initialize: function(options){
        this.listenTo(app.vent, "user:signedIn", function(user){
          this.model = user;
          this.render();
        }, this);
      },

      events: {
        'click li[data-action="signIn"]': 'onUserSignIn',
        'click li[data-action="signOut"]': 'onUserSignOut'
      },

      onUserSignIn: function(e){
        e.preventDefault();
        app.commands.execute("user:signIn");
      },

      onUserSignOut: function(e){
        e.preventDefault();
        console.log(app.commands.hasHandler("user:signOut"));
        app.commands.execute("user:signOut");
      }
    });
  });
