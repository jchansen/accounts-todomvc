/*global define */

define(
  [
    'backbone',
    'models/TodoLIst',
    'globals'
  ],
  function (Backbone, TodoList, globals) {
    'use strict';

    return Backbone.Collection.extend({
      model: TodoList,
      url: globals.API_ROOT_URL + "/api/lists"
    });
  });
