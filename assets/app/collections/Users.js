/*global define */

define(
  [
    'backbone',
    'models/User',
    'globals'
  ],
  function (Backbone, User, globals) {
    'use strict';

    return Backbone.Collection.extend({
      model: User,
      url: globals.API_ROOT_URL + "/api/users"
    });
  });
