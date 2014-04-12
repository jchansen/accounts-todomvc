/*global define */

define(
  [
    'marionette',
    'tpl!./todoList.html',
    'app'
  ],
  function (Marionette, template, app) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      tagName: 'tr',

      initialize: function(options){

      }
    });
  });