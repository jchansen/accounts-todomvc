/*global define */

define(
  [
    'backbone',
    'globals'
  ],
  function (Backbone, globals) {
    'use strict';

    return Backbone.Model.extend({
      urlRoot: globals.API_ROOT_URL + "/api/session",
      idAttribute: 'username',

      defaults: {
        username: '',
        firstName: '',
        surName: '',
        fullName: ''
      }

    });
  });

