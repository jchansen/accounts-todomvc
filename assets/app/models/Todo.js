/*global define */

define(
  [
    'backbone',
    'globals'
  ],
  function (Backbone, globals) {
    'use strict';

    return Backbone.Model.extend({
      urlRoot: globals.API_ROOT_URL + "/api/todos",

      defaults: {
        title: '',
        completed: false
      },

      toggle: function () {
        return this.set('completed', !this.get('completed'));
      }

    });
  });

